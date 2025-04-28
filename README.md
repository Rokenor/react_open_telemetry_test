# React OpenTelemetry Demo

This project demonstrates how to integrate OpenTelemetry with a React application for distributed tracing.

## Features

- React 18 with TypeScript
- OpenTelemetry integration for distributed tracing
- Example API calls with trace instrumentation
- Modern UI with Tailwind CSS
- Comprehensive landing page with implementation details
- Detailed span attributes for API calls
- Error handling with span status codes

## Prerequisites

- Node.js 14.x or later
- npm 6.x or later
- Docker Desktop

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up OpenTelemetry Infrastructure

#### Install Docker Desktop
1. Download and install Docker Desktop from [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
2. Start Docker Desktop and wait for it to be running

#### Start Jaeger
```bash
docker-compose up -d
```

### 3. Start the Application
```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Viewing Traces

1. Open your React application at http://localhost:3000
2. Click on any of the three API call buttons:
   - "Get News" - Fetches news data
   - "Get Vehicles" - Fetches vehicle manufacturers
   - "Get IPs" - Fetches your current IP address
3. Open Jaeger UI at http://localhost:16686
4. Select service "react-opentelemetry-demo" from the dropdown
5. Click "Find Traces" to see the traces from your application

## OpenTelemetry Configuration

The application is configured to send traces to a local OpenTelemetry collector at `http://localhost:4318/v1/traces`. The configuration can be found in `src/telemetry/telemetry.ts`.

### Tracing Implementation Details

Each API call is instrumented with detailed tracing information:

1. **Span Names**:
   - `news.search` - For the news API call
   - `vehicles.manufacturers.list` - For the vehicles API call
   - `ip.address.get` - For the IP address API call

2. **Span Attributes**:
   - `http.method`: The HTTP method (GET)
   - `http.url`: Full URL of the endpoint
   - `endpoint.name`: Descriptive name of the endpoint
   - `service.name`: Name of the service being called

3. **Error Handling**:
   - Success: Sets `SpanStatusCode.OK`
   - Failure: Sets `SpanStatusCode.ERROR` with error message

## API Endpoints

The application makes three example API calls to demonstrate tracing:
- GET https://chroniclingamerica.loc.gov/search/titles/results/ (News API)
- GET https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers (Vehicle Manufacturers API)
- GET https://api.ipify.org (IP Address API)

The implementation can be found in `src/App.tsx`.

## Troubleshooting

### Port Conflicts
If you see errors about ports being already in use:
1. Check if any other application is using ports 16686, 4317, or 4318
2. Stop any conflicting applications
3. Stop and remove existing containers:
   ```bash
   docker stop jaeger
   docker rm jaeger
   ```
4. Start Jaeger again with the docker run command

### Docker Issues
- Make sure Docker Desktop is running
- Try restarting Docker Desktop if you encounter connection issues
- Check Docker logs: `docker logs jaeger`

### CORS Issues
If you encounter CORS errors:
1. Check that the OpenTelemetry collector is properly configured with CORS headers
2. Verify that the collector is accessible from your application
3. Check the browser console for specific CORS error messages

## Available Scripts

- `npm start`: Runs the app in development mode

## Learn More

- [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
- [React Documentation](https://reactjs.org/)
- [Jaeger Documentation](https://www.jaegertracing.io/docs/)