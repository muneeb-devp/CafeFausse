# CafeFausse API

## Overview

CafeFausse is a Flask-based REST API for managing restaurant reservations and newsletter signups. It uses SQLAlchemy for ORM and supports CORS for cross-origin requests. The API allows customers to book tables, sign up for newsletters, and manages customer and reservation data in a relational database.

---

## Data Models

### Customer

Represents a customer of the cafe.

| Field             | Type            | Description                        |
| ----------------- | --------------- | ---------------------------------- |
| customer_id       | Integer (PK)    | Unique identifier for the customer |
| customer_name     | String          | Name of the customer               |
| email_address     | String (unique) | Customer's email address           |
| phone_number      | String          | Customer's phone number (optional) |
| newsletter_signup | Boolean         | Newsletter subscription status     |

**Relationships:**

- `reservations`: One-to-many relationship with `Reservation`.

---

### Reservation

Represents a table reservation.

| Field          | Type         | Description                           |
| -------------- | ------------ | ------------------------------------- |
| reservation_id | Integer (PK) | Unique identifier for the reservation |
| customer_id    | Integer (FK) | References `Customer.customer_id`     |
| time_slot      | DateTime     | Date and time of the reservation      |
| table_number   | Integer      | Assigned table number                 |

**Constraints:**

- Unique constraint on (`time_slot`, `table_number`) to prevent double-booking.

---

## API Routes

### POST `/api/reservations`

Create a new reservation.

**Request JSON:**

```json
{
  "timeSlot": "YYYY-MM-DDTHH:MM:SSZ",
  "numGuests": 2,
  "customerName": "John Doe",
  "emailAddress": "john@example.com",
  "phoneNumber": "1234567890", // optional
  "newsletterSignup": true // optional
}
```

**Responses:**

- `201 Created`: Reservation successful, returns reservation details.
- `409 Conflict`: All tables booked for the requested time slot.
- `400 Bad Request`: Missing or invalid fields.
- `500 Internal Server Error`: Unexpected error.

---

### POST `/api/newsletter`

Sign up for the newsletter.

**Request JSON:**

```json
{
  "email": "john@example.com"
}
```

**Responses:**

- `201 Created`: Successfully signed up.
- `200 OK`: Already subscribed.
- `400 Bad Request`: Invalid or missing email.
- `409 Conflict`: Email already subscribed.
- `500 Internal Server Error`: Unexpected error.

---

## Application Structure

- `app.py`: Application factory and entry point.
- `models/`: SQLAlchemy models for `Customer` and `Reservation`.
- `routes.py`: API route definitions.
- `utils.py`: Helper functions (validation, table assignment, etc.).

---

## Getting Started

1. Install dependencies.
2. Set up environment variables and database.
3. Run the app:
   ```bash
   python app.py
   ```
4. Access API at `http://localhost:8000/api/`
