import React from 'react';
import axios from 'axios';
import { trace, SpanStatusCode, SpanKind } from '@opentelemetry/api';

const App: React.FC = () => {
  const makeApiCallNews = async () => {
    const tracer = trace.getTracer('react-app');
    const url = 'https://chroniclingamerica.loc.gov/search/titles/results/?terms=oakland&format=json&page=5';

    console.log('Making API call to News');
    
    await tracer.startActiveSpan('news.search', {
      kind: SpanKind.CLIENT,
      attributes: {
        'http.method': 'GET',
        'http.url': url,
        'endpoint.name': 'chroniclingamerica-search',
        'service.name': 'chroniclingamerica',
      },
    }, async (span) => {
      try {
        await axios.get(url);
        span.setStatus({ code: SpanStatusCode.OK });
      } catch (error) {
        console.log('API call to News failed:', error);
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error instanceof Error ? error.message : 'Unknown error',
        });
      } finally {
        span.end();
      }
    });
  };

  const makeApiCallVehicles = async () => {
    const tracer = trace.getTracer('react-app');
    const url = 'https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json';

    console.log('Making API call to Vehicles');
    
    await tracer.startActiveSpan('vehicles.manufacturers.list', {
      kind: SpanKind.CLIENT,
      attributes: {
        'http.method': 'GET',
        'http.url': url,
        'endpoint.name': 'nhtsa-manufacturers',
        'service.name': 'nhtsa-api',
      },
    }, async (span) => {
      try {
        await axios.get(url);
        span.setStatus({ code: SpanStatusCode.OK });
      } catch (error) {
        console.log('API call to Vehicles failed:', error);
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error instanceof Error ? error.message : 'Unknown error',
        });
      } finally {
        span.end();
      }
    });
  };

  const makeApiCallIps = async () => {
    const tracer = trace.getTracer('react-app');
    const url = 'https://api.ipify.org?format=json';

    console.log('Making API call to IPs');
    
    await tracer.startActiveSpan('ip.address.get', {
      kind: SpanKind.CLIENT,
      attributes: {
        'http.method': 'GET',
        'http.url': url,
        'endpoint.name': 'ipify-get-ip',
        'service.name': 'ipify',
      },
    }, async (span) => {
      try {
        await axios.get(url);
        span.setStatus({ code: SpanStatusCode.OK });
      } catch (error) {
        console.log('API call to IPs failed:', error);
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error instanceof Error ? error.message : 'Unknown error',
        });
      } finally {
        span.end();
      }
    });
  };

  return (
    <div className="App">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">OpenTelemetry with React</h1>
          <p className="text-xl">A comprehensive guide to implementing distributed tracing in your React applications</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Live Demo</h2>
          <p className="mb-4">Click the button below to make three API calls with OpenTelemetry tracing enabled.</p>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Active Traces</h3>
            <button 
              onClick={makeApiCallNews}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded focus:outline-none focus:shadow-outline"
            >
              Get News
            </button>
            <button 
              onClick={makeApiCallVehicles}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded focus:outline-none focus:shadow-outline"
            >
              Get Vehicles
            </button>
            <button 
              onClick={makeApiCallIps}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Get IPs
            </button>
            <p className="mt-4">After clicking, open your browser's developer tools to see the traced API calls in action.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App; 