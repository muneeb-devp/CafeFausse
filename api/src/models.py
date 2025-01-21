from flask_sqlalchemy import SQLAlchemy
from os import environ


db: SQLAlchemy = SQLAlchemy()
TOTAL_TABLES: int = int(environ.get("TOTAL_TABLES", 30))


class Customer(db.Model):
    __tablename__ = 'customers'
    customer_id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(255), nullable=False)
    email_address = db.Column(db.String(255), unique=True, nullable=False)
    phone_number = db.Column(db.String(50))
    newsletter_signup = db.Column(db.Boolean, default=False)

    reservations = db.relationship('Reservation', backref='customer',
                                   lazy=True)

    def __repr__(self) -> str:
        return f"<Customer {self.customer_name} ({self.email_address})>"

    def __str__(self) -> str:
        return self.customer_name


class Reservation(db.Model):
    __tablename__ = 'reservations'
    reservation_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer,
                            db.ForeignKey('customers.customer_id'),
                            nullable=False)
    time_slot = db.Column(db.DateTime, nullable=False)
    table_number = db.Column(db.Integer, nullable=False)

    __table_args__ = (db.UniqueConstraint('time_slot', 'table_number',
                                          name='_time_slot_table_uc'),)

    def __repr__(self) -> str:
        return (f"<Reservation {self.reservation_id} - "
                f"Table {self.table_number} at {self.time_slot}>")


def create_tables() -> None:
    try:
        db_url = environ.get("DB_CONN_STR")
        if not db_url:
            raise ValueError("DB_CONN_STR environment variable not set.")

        # Mask credentials in the connection string for logging
        creds_part = db_url.split('@')[0].split('//')[1]
        masked_url = db_url.replace(creds_part, '***:***')
        print(f"Attempting to connect to database: {masked_url}")

        # Create tables using the app context
        # PostgreSQL service should handle database creation
        db.create_all()
        print("Database tables created successfully!")
    except Exception as e:
        print(f"Error creating tables: {e}")
        # Don't raise the exception - let the app continue running
        # Tables will be created on first successful connection
