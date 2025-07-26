# Café Fausse Restaurant

![HomeSnap Screenshot](ui/public/homesnap.png)

## 📖 Overview

Café Fausse is a modern, full-stack restaurant management web application that provides a complete digital solution for restaurant operations. The application features an elegant customer-facing website with reservation capabilities, menu display, and interactive gallery, backed by a robust API for managing restaurant data.

## ✨ Features

### Customer-Facing Features

-   **🏠 Homepage**: Elegant landing page with restaurant information and ambiance
-   **📋 Interactive Menu**: Categorized menu items with detailed descriptions and pricing
-   **📅 Reservation System**: Real-time table booking with availability checking
-   **🖼️ Image Gallery**: Lightbox-enabled gallery showcasing restaurant ambiance and dishes
-   **ℹ️ About Us**: Restaurant story, awards, and customer reviews
-   **📧 Newsletter Signup**: Customer engagement through email subscriptions

### Backend Features

-   **👥 Customer Management**: Automated customer record creation and management
-   **🪑 Table Management**: Dynamic table assignment with availability tracking
-   **⏰ Reservation Management**: Time slot management with conflict prevention
-   **📊 Database Integration**: Persistent data storage with PostgreSQL
-   **🔄 RESTful API**: Clean API endpoints for all frontend operations

## 🛠️ Technology Stack

### Frontend

-   **⚛️ React 19.1.0**: Modern UI library with latest features
-   **📘 TypeScript**: Type-safe development with enhanced developer experience
-   **⚡ Vite**: Fast build tool and development server
-   **🎨 Tailwind CSS 4.1.11**: Utility-first CSS framework for responsive design
-   **🖼️ Custom Components**: Reusable React components for consistent UI

### Backend

-   **🐍 Python 3.12**: Modern Python with latest language features
-   **🌶️ Flask 3.1.1**: Lightweight and flexible web framework
-   **🗃️ SQLAlchemy**: Powerful ORM for database operations
-   **🔌 Flask-CORS**: Cross-origin resource sharing support
-   **📊 PostgreSQL**: Robust relational database

### DevOps & Infrastructure

-   **🐳 Docker**: Containerization for consistent environments
-   **🐙 Docker Compose**: Multi-container orchestration
-   **🔄 Hot Reloading**: Development mode with live code updates
-   **📦 Multi-stage Builds**: Optimized production images

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend UI   │    │   Backend API   │    │   PostgreSQL    │
│   (React/Vite)  │◄──►│    (Flask)      │◄──►│   Database      │
│   Port: 3000    │    │   Port: 8000    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Database Schema

-   **Customers Table**: Customer information and newsletter preferences
-   **Reservations Table**: Booking records with time slots and table assignments
-   **Unique Constraints**: Prevention of double-bookings for time slots and tables

### API Endpoints

-   `GET /api/status` - Health check
-   `POST /api/reservations` - Create new reservation
-   `GET /api/reservations/<customer_id>` - Retrieve customer reservations
-   `POST /api/newsletter` - Newsletter subscription management

## 🚀 Getting Started

### Prerequisites

-   [Docker](https://www.docker.com/get-started/) (recommended)
-   [Docker Compose](https://docs.docker.com/compose/install/)
-   OR: Node.js 22+, Python 3.12+, PostgreSQL 15+

### Option 1: Docker Setup (Recommended)

#### Production Mode

```bash
# Clone the repository
git clone <repository-url>
cd CafeFausse

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# Database: localhost:5432
```

#### Development Mode (with hot reloading)

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop services
docker-compose -f docker-compose.dev.yml down
```

### Option 2: Manual Setup

#### Backend Setup

```bash
cd api

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export DB_CONN_STR=postgresql://postgres:postgres@localhost:5432/cafefausse
export FLASK_APP=app.py
export FLASK_ENV=development

# Run the application
python -m flask run --host=0.0.0.0 --port=8000
```

#### Frontend Setup

```bash
cd ui

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

#### Database Setup

```bash
# Create PostgreSQL database
createdb cafefausse

# Tables will be created automatically when the Flask app starts
```

## 📁 Project Structure

```
CafeFausse/
├── api/                          # Backend Flask application
│   ├── app.py                    # Flask application factory
│   ├── models.py                 # Database models (Customer, Reservation)
│   ├── routes.py                 # API endpoints and business logic
│   ├── config.py                 # Application configuration
│   ├── requirements.txt          # Python dependencies
│   ├── Dockerfile                # Production Docker image
│   └── Dockerfile.dev            # Development Docker image
├── ui/                           # Frontend React application
│   ├── src/
│   │   ├── components/           # Reusable React components
│   │   │   ├── Navbar.tsx        # Navigation component
│   │   │   ├── Footer.tsx        # Footer component
│   │   │   ├── ReservationForm.tsx # Booking form
│   │   │   ├── MenuItem.tsx      # Menu item display
│   │   │   ├── ImageGallery.tsx  # Photo gallery with lightbox
│   │   │   ├── ReviewCard.tsx    # Customer review display
│   │   │   ├── AwardCard.tsx     # Award showcase
│   │   │   └── NewsletterSignup.tsx # Email subscription
│   │   ├── pages/                # Main application pages
│   │   │   ├── Home.tsx          # Landing page
│   │   │   ├── Menu.tsx          # Menu display
│   │   │   ├── Reservation.tsx   # Booking page
│   │   │   ├── Gallery.tsx       # Photo gallery
│   │   │   └── AboutUs.tsx       # Restaurant information
│   │   ├── types/                # TypeScript type definitions
│   │   └── App.tsx               # Main application component
│   ├── package.json              # Node.js dependencies
│   ├── vite.config.ts            # Vite configuration
│   ├── tailwind.config.js        # Tailwind CSS configuration
│   ├── Dockerfile                # Production Docker image
│   └── Dockerfile.dev            # Development Docker image
├── docker-compose.yml            # Production environment
├── docker-compose.dev.yml        # Development environment
├── DOCKER_README.md              # Docker-specific documentation
└── README.md                     # This file
```

## 🔧 Configuration

### Environment Variables

#### Backend (Flask)

-   `DB_CONN_STR`: PostgreSQL connection string
-   `FLASK_APP`: Entry point file (app.py)
-   `FLASK_ENV`: Environment mode (development/production)
-   `FLASK_DEBUG`: Debug mode (0/1)
-   `TOTAL_TABLES`: Number of available tables (default: 30)

#### Frontend (React)

-   `NODE_ENV`: Environment mode (development/production)
-   `VITE_API_URL`: Backend API URL (http://localhost:8000)

### Database Configuration

-   **Database**: cafefausse
-   **Username**: postgres
-   **Password**: postgres
-   **Host**: localhost (or 'db' in Docker)
-   **Port**: 5432

## 🧪 API Documentation

### Reservation Endpoints

#### Create Reservation

```http
POST /api/reservations
Content-Type: application/json

{
  "timeSlot": "2024-01-15 19:00:00",
  "numGuests": 4,
  "customerName": "John Doe",
  "emailAddress": "john@example.com",
  "phoneNumber": "+1234567890",
  "newsletterSignup": true
}
```

#### Get Customer Reservations

```http
GET /api/reservations/<customer_id>
```

### Utility Endpoints

#### Health Check

```http
GET /api/status
```

#### Newsletter Signup

```http
POST /api/newsletter
Content-Type: application/json

{
  "email": "customer@example.com",
  "name": "Customer Name"
}
```

## 📊 Business Logic

### Reservation System

1. **Customer Management**: Automatic customer creation or retrieval based on email
2. **Table Assignment**: Random available table selection for each time slot
3. **Conflict Prevention**: Unique constraints prevent double-booking
4. **Time Slot Management**: Support for multiple reservation times per day

### Data Validation

-   Email format validation using regex patterns
-   Required field validation for reservations
-   Type checking with TypeScript on frontend

## 🔍 Development

### Running Tests

```bash
# Backend tests (if implemented)
cd api
python -m pytest

# Frontend tests
cd ui
npm test
```

### Code Quality

-   **TypeScript**: Strict type checking enabled
-   **ESLint**: Code linting for JavaScript/TypeScript
-   **Prettier**: Code formatting (can be added)

### Hot Reloading

Development mode includes:

-   Vite hot module replacement for React
-   Flask debug mode with auto-restart
-   Volume mounts for live code updates

## 🚀 Deployment

### Production Deployment

1. Build Docker images: `docker-compose build`
2. Start services: `docker-compose up -d`
3. Monitor logs: `docker-compose logs -f`

### Scaling Considerations

-   Database connection pooling
-   Load balancing for multiple API instances
-   CDN for static assets
-   Environment-specific configurations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make changes and test thoroughly
4. Commit with descriptive messages: `git commit -m "Add reservation cancellation"`
5. Push to branch: `git push origin feature/new-feature`
6. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

#### Port Conflicts

If ports 3000, 8000, or 5432 are in use:

```bash
# Check port usage
lsof -i :3000
lsof -i :8000
lsof -i :5432

# Modify docker-compose.yml port mappings as needed
```

#### Database Connection Issues

```bash
# Reset database
docker-compose down -v
docker-compose up -d

# Check database logs
docker-compose logs db
```

#### Build Issues

```bash
# Clean rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 📞 Support

For support, please open an issue on the repository or contact the development team.

---

**Café Fausse** - _Experience Culinary Excellence_ 🍽️
