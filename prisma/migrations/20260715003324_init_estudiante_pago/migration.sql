-- CreateTable
CREATE TABLE "Estudiante" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "codigo" TEXT NOT NULL,

    CONSTRAINT "Estudiante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pago" (
    "id" TEXT NOT NULL,
    "monto" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estudiante_id" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',

    CONSTRAINT "Pago_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_codigo_key" ON "Estudiante"("codigo");

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_estudiante_id_fkey" FOREIGN KEY ("estudiante_id") REFERENCES "Estudiante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
