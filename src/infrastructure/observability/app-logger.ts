import { logs, SeverityNumber } from '@opentelemetry/api-logs';

const logger = logs.getLogger('utp-pagos-api');

export function logInfo(
  body: string,
  attributes?: Record<string, string | number>,
) {
  logger.emit({
    severityNumber: SeverityNumber.INFO,
    severityText: 'INFO',
    body,
    attributes,
  });
}

export function logError(
  body: string,
  attributes?: Record<string, string | number>,
) {
  logger.emit({
    severityNumber: SeverityNumber.ERROR,
    severityText: 'ERROR',
    body,
    attributes,
  });
}
