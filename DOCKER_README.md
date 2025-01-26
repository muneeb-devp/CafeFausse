# Café Fausse Docker Setup

This project includes Docker Compose configurations for both production and development environments with full CORS support and environment variable configuration.

## Prerequisites

- Docker
- Docker Compose

## Project Structure

- `api/` - Flask backend API with CORS support
- `ui/` - React frontend application with Vite
- `docker-compose.yml` - Production configuration
- `docker-compose.dev.yml` - Development configuration

## Quick Start

### Production Mode

To run the application in production mode:

```bash
docker-compose up -d
```

This will:

- Build and start the PostgreSQL database
- Build and start the Flask API on port 8000 with Gunicorn
- Build and start the React frontend on port 3000

Access the application at: http://localhost:3000

### Development Mode

For development with hot reloading:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

This provides:

- Hot reloading for both frontend and backend
- Volume mounts for live code changes
- Debug mode enabled for Flask
- CORS configured for localhost ports 3000, 3001, and 3002

Access the application at: http://localhost:3000

## Environment Variables

### API Environment Variables

- `FLASK_APP`: Flask application entry point (default: app.py)
- `FLASK_ENV`: Environment mode (production/development)
- `FLASK_DEBUG`: Debug mode (development only)
- `DB_CONN_STR`: PostgreSQL connection string
- `FRONTEND_URL`: Additional frontend URL for CORS (optional)

### UI Environment Variables

- `NODE_ENV`: Node environment (production/development)
- `VITE_API_URL`: Backend API URL for frontend requests

## CORS Configuration

The API is configured to accept requests from:

- http://localhost:3000
- http://ui:3000 (Docker internal)
- Custom URL via FRONTEND_URL environment variable

## Services

### Database (PostgreSQL)

- **Port**: 5432
- **Database**: cafefausse
- **Username**: postgres
- **Password**: postgres

### API (Flask)

- **Port**: 8000
- **Environment**: Development/Production
- **Health check**: Depends on database

### UI (React/Vite)

- **Port**: 3000
- **Environment**: Development/Production
- **Depends on**: API service

## Useful Commands

```bash
# Start all services
docker-compose up -d

# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild images
docker-compose build

# Remove volumes (this will delete database data)
docker-compose down -v
```

## Environment Variables

The following environment variables are configured:

### API

- `FLASK_APP=app.py`
- `FLASK_ENV=development` (dev mode only)
- `FLASK_DEBUG=1` (dev mode only)
- `DB_CONN_STR=postgresql://postgres:postgres@db:5432/cafefausse`

### UI

- `NODE_ENV=production/development`
- `VITE_API_URL=http://localhost:8000`

## Database Persistence

Database data is persisted using Docker volumes. To reset the database:

```bash
docker-compose down -v
docker-compose up -d
```

## Troubleshooting

1. **Port conflicts**: If ports 3000, 8000, or 5432 are already in use, modify the port mappings in the compose files.

2. **Database connection issues**: Ensure the database service is healthy before the API starts. The compose file includes health checks.

3. **Hot reloading not working**: Make sure you're using the development compose file (`docker-compose.dev.yml`).

4. **Build issues**: Try rebuilding the images:
   ```bash
   docker-compose build --no-cache
   ```

## Accessing the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Database: localhost:5432
