import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { BatchLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

/** Grafana Cloud: .../otlp  |  Local LGTM: http://localhost:4318 */
const otlpBase =
  process.env.OTEL_EXPORTER_OTLP_ENDPOINT?.replace(/\/v1\/.*$/, '') ??
  'http://localhost:4318';

/** Formato OTEL: "Authorization=Basic%20....,Otro=valor" */
function parseOtlpHeaders(raw?: string): Record<string, string> | undefined {
  if (!raw?.trim()) return undefined;
  return Object.fromEntries(
    raw.split(',').map((pair) => {
      const eq = pair.indexOf('=');
      if (eq === -1) return [pair.trim(), ''];
      const key = pair.slice(0, eq).trim();
      const value = decodeURIComponent(pair.slice(eq + 1).trim());
      return [key, value];
    }),
  );
}

const otlpHeaders = parseOtlpHeaders(process.env.OTEL_EXPORTER_OTLP_HEADERS);

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME ?? 'utp-pagos-api',
  }),
  traceExporter: new OTLPTraceExporter({
    url: `${otlpBase}/v1/traces`,
    headers: otlpHeaders,
  }),
  logRecordProcessors: [
    new BatchLogRecordProcessor({
      exporter: new OTLPLogExporter({
        url: `${otlpBase}/v1/logs`,
        headers: otlpHeaders,
      }),
    }),
  ],
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

process.on('SIGTERM', () => {
  void sdk.shutdown();
});
