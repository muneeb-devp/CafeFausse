"""Tests for database models."""
from datetime import datetime, timedelta
from src.models import Customer, Reservation


class TestCustomerModel:
    """Tests for the Customer model."""

    def test_create_customer(self, app):
        """Test creating a new customer."""
        with app.app_context():
            customer = Customer(
                customer_name='John Doe',
                email_address='john@example.com',
                phone_number='555-1234',
                newsletter_signup=True
            )
            
            assert customer.customer_name == 'John Doe'
            assert customer.email_address == 'john@example.com'
            assert customer.phone_number == '555-1234'
            assert customer.newsletter_signup is True

    def test_customer_string_representation(self, app):
        """Test the string representation of a customer."""
        with app.app_context():
            customer = Customer(
                customer_name='Jane Smith',
                email_address='jane@example.com'
            )
            
            assert str(customer) == 'Jane Smith'

    def test_customer_without_phone(self, app):
        """Test creating a customer without phone number."""
        with app.app_context():
            customer = Customer(
                customer_name='No Phone',
                email_address='nophone@example.com',
                newsletter_signup=False
            )
            
            assert customer.phone_number is None
            assert customer.newsletter_signup is False


class TestReservationModel:
    """Tests for the Reservation model."""

    def test_create_reservation(self, app):
        """Test creating a new reservation."""
        with app.app_context():
            # Create a customer first
            customer = Customer(
                customer_name='Test Customer',
                email_address='test@example.com'
            )
            
            future_datetime = datetime.now() + timedelta(days=7)
            
            reservation = Reservation(
                customer_id=1,  # Will be set when customer is saved
                time_slot=future_datetime,
                table_number=5
            )
            
            assert reservation.table_number == 5
            assert reservation.time_slot == future_datetime
            assert reservation.customer_id == 1

    def test_reservation_string_representation(self, app):
        """Test the string representation of a reservation."""
        with app.app_context():
            future_datetime = datetime.now() + timedelta(days=7)
            
            reservation = Reservation(
                customer_id=1,
                time_slot=future_datetime,
                table_number=3
            )
            
            expected_str = (f"<Reservation {reservation.reservation_id} - "
                            f"Table 3 at {future_datetime}>")
            assert str(reservation) == expected_str

    def test_reservation_without_special_requests(self, app):
        """Test creating a reservation without optional fields."""
        with app.app_context():
            future_datetime = datetime.now() + timedelta(days=3)
            
            reservation = Reservation(
                customer_id=1,
                time_slot=future_datetime,
                table_number=1
            )
            
            # Basic reservation should work fine with minimal fields
            assert reservation.table_number == 1
            assert reservation.customer_id == 1

    def test_reservation_relationships(self, app):
        """Test the relationship between Customer and Reservation."""
        with app.app_context():
            from src.models import db
            
            customer = Customer(
                customer_name='Relationship Test',
                email_address='relationship@example.com'
            )
            db.session.add(customer)
            db.session.commit()  # Get customer_id
            
            future_datetime1 = datetime.now() + timedelta(days=5)
            future_datetime2 = datetime.now() + timedelta(days=6)
            
            reservation1 = Reservation(
                customer_id=customer.customer_id,
                time_slot=future_datetime1,
                table_number=2
            )
            
            reservation2 = Reservation(
                customer_id=customer.customer_id,
                time_slot=future_datetime2,
                table_number=4
            )
            
            db.session.add(reservation1)
            db.session.add(reservation2)
            db.session.commit()
            
            # Test that customer has multiple reservations
            assert len(customer.reservations) == 2
            assert reservation1 in customer.reservations
            assert reservation2 in customer.reservations
            
            # Test back-reference
            assert reservation1.customer == customer
            assert reservation2.customer == customer
