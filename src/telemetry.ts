import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { TraceExporter } from '@google-cloud/opentelemetry-cloud-trace-exporter'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express'
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core'
import { PrismaInstrumentation } from '@prisma/instrumentation'

const provider = new NodeTracerProvider()
if (process.env.NODE_ENV === 'production') {
  provider.register()

  registerInstrumentations({
    instrumentations: [
      new ExpressInstrumentation(),
      new HttpInstrumentation(),
      new NestInstrumentation(),
      new PrismaInstrumentation(),
    ],
  })
  const exporter = new TraceExporter()
  provider.addSpanProcessor(new BatchSpanProcessor(exporter))
}
