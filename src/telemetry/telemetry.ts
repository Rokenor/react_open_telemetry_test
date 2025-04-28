import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';

export const setupTelemetry = () => {
  const provider = new WebTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: 'react-opentelemetry-demo',
      [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
    }),
  });

  const collectorUrl = 'http://localhost:4318/v1/traces';
  const exporter = new OTLPTraceExporter({
    url: collectorUrl,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    },
  });

  // Using SimpleSpanProcessor instead of BatchSpanProcessor to avoid version conflicts
  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

  // Register the provider
  provider.register({
    contextManager: new ZoneContextManager(),
  });

  // Register auto instrumentations
  registerInstrumentations({
    instrumentations: [
      getWebAutoInstrumentations({
        // Disable XMLHttpRequest instrumentation in favor of fetch
        '@opentelemetry/instrumentation-xml-http-request': {
          enabled: false,
        },
      }),
    ],
  });

  return provider;
}; 