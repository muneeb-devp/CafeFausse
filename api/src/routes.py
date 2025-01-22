from flask import Blueprint, request, jsonify
from datetime import datetime
import re
import random
from typing import Optional, Set, Tuple, Dict, Any
from models import db, Customer, Reservation, TOTAL_TABLES


def is_valid_email(email: str) -> bool:
    """Basic email format validation."""
    regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(regex, email) is not None


def get_or_create_customer(customer_name: str, 
                          email_address: str,
                          phone_number: Optional[str],
                          newsletter_signup: bool) -> Customer:
    """
    Retrieves customer object if customer exists, otherwise creates a new customer.
    (FR-17)
    """
    customer = Customer.query.filter_by(email_address=email_address).first()

    if customer:
        return customer

    # Create a new customer if one doesn't exist
    new_customer = Customer(
        customer_name=customer_name,
        email_address=email_address,
        phone_number=phone_number,
        newsletter_signup=newsletter_signup
    )
    db.session.add(new_customer)
    db.session.commit()  # Commit changes to get customer_id if new

    return new_customer


def get_booked_tables_for_slot(time_slot: datetime) -> Set[int]:
    """
    Fetches all table numbers that are already booked for a given time slot.
    (FR-8 and FR-18 - retrieving currently booked tables for a time slot)
    """
    booked_reservations = Reservation.query.filter_by(
        time_slot=time_slot).all()
    booked_tables = {res.table_number for res in booked_reservations}
    return booked_tables


def find_available_table_number(booked_tables: Set[int]) -> Optional[int]:
    """
    Finds a random available table number from the total tables.
    (FR-8 and FR-18 - assigning a random table)
    """
    all_tables = set(range(1, TOTAL_TABLES + 1))  # Tables 1 to 30
    available_tables = list(all_tables - booked_tables)

    if not available_tables:
        return None  # No tables available

    return random.choice(available_tables)


api_bp = Blueprint('api', __name__)

@api_bp.route('/health', methods=['GET'])
def health_check() -> Tuple[Dict[str, str], int]:
    """
    Health check endpoint to verify if the API is running.
    """
    return jsonify({"status": "ok"}), 200

@api_bp.route('/reservations', methods=['POST'])
def handle_reservation() -> Tuple[Dict[str, Any], int]:
    """
    Handles new table reservation requests.
    (FR-6, FR-7, FR-8, FR-9, FR-17, FR-18)
    """
    data = request.get_json()
    if not data:
        return jsonify({"message": "Invalid JSON data"}), 400

    # Extract data from the request (FR-6 fields)
    time_slot_str = data.get('timeSlot')
    num_guests = data.get('numGuests')
    customer_name = data.get('customerName')
    email_address = data.get('emailAddress')
    phone_number = data.get('phoneNumber', None) # Optional
    newsletter_signup = data.get('newsletterSignup', False) # Default to False if not provided

    # Basic validation (FR-7)
    if not all([time_slot_str, num_guests, customer_name, email_address]):
        return jsonify({"message": "Missing required fields (time slot, number of guests, customer name, email address)."}), 400

    if not is_valid_email(email_address):
        return jsonify({"message": "Invalid email address format."}), 400

    try:
        # Parse time slot string to datetime object
        # Assuming timeSlot format like "YYYY-MM-DDTHH:MM:SS" or similar ISO format
        time_slot = datetime.fromisoformat(time_slot_str.replace('Z', '+00:00'))
    except ValueError:
        return jsonify({"message": "Invalid time slot format. Please use ISO format (e.g., YYYY-MM-DDTHH:MM:SSZ)."}), 400

    # try:
    # Get or create customer (FR-17)
    customer = get_or_create_customer(customer_name, email_address, phone_number, newsletter_signup)

    # Check existing bookings for the time slot (FR-8, FR-18)
    booked_tables = get_booked_tables_for_slot(time_slot)

    # Find an available table (FR-8, FR-18)
    assigned_table_number = find_available_table_number(booked_tables)

    if assigned_table_number is None:
        # All seats are taken for that time slot (FR-9, FR-18)
        db.session.rollback() # Rollback any customer insertion if no table is available
        return jsonify({
            "message": "Sorry, all tables are booked for this time slot. Please pick another time.",
            "success": False
        }), 409 # Conflict

    # Insert the new reservation (FR-17)
    new_reservation = Reservation(
        customer_id=customer.customer_id,
        time_slot=time_slot,
        table_number=assigned_table_number
    )
    db.session.add(new_reservation)
    db.session.commit()

    # Display a success message on booking (FR-9)
    return jsonify({
        "message": f"Reservation successful! Your table number is {assigned_table_number}.",
        "success": True,
        "reservationDetails": {
            "customerName": customer_name,
            "timeSlot": time_slot_str,
            "tableNumber": assigned_table_number,
            "numGuests": num_guests # Note: num_guests is not stored in DB, only passed for response
        }
    }), 201 # Created

    # except Exception as e:
    #     db.session.rollback() # Rollback in case of any error
    #     print(f"Error during reservation: {e}")
    #     return jsonify({"message": f"An error occurred during reservation: {e}"}), 500

@api_bp.route('/newsletter', methods=['POST'])
def newsletter_signup() -> Tuple[Dict[str, Any], int]:
    """
    Handles newsletter signup requests.
    (FR-15, FR-16, FR-17)
    """
    data = request.get_json()
    if not data:
        return jsonify({"message": "Invalid JSON data"}), 400

    email = data.get('email')

    if not email:
        return jsonify({"message": "Email is required for newsletter signup."}), 400

    if not is_valid_email(email): # Input validation for proper email format (FR-15)
        return jsonify({"message": "Invalid email address format."}), 400

    try:
        customer = Customer.query.filter_by(email_address=email).first()

        if customer:
            # If customer exists, update newsletter_signup to TRUE (FR-16)
            if not customer.newsletter_signup: # Only update if not already signed up
                customer.newsletter_signup = True
                db.session.commit()
                return jsonify({"message": "Your newsletter subscription has been updated!", "success": True}), 200
            else:
                return jsonify({"message": "This email is already subscribed to our newsletter.", "success": True}), 200
        else:
            new_customer = Customer(
                customer_name=f"Newsletter Subscriber {email}", # Placeholder name
                email_address=email,
                phone_number=None,
                newsletter_signup=True
            )
            db.session.add(new_customer)
            db.session.commit()
            return jsonify({"message": "Successfully signed up for the newsletter!", "success": True}), 201

    except Exception as e:
        db.session.rollback() 
        print(f"Error during newsletter signup: {e}")

        if "duplicate key value violates unique constraint" in str(e):
             return jsonify({"message": "This email is already subscribed to our newsletter."}), 409
        return jsonify({"message": f"An error occurred during newsletter signup: {e}"}), 500

@api_bp.route('/reservations', methods=['GET'])
def get_reservations() -> Tuple[Dict[str, Any], int]:
    """
    Retrieves all reservations.
    """
    try:
        reservations = Reservation.query.all()
        result = []
        for res in reservations:
            customer = Customer.query.get(res.customer_id)
            result.append({
                "reservationId": res.reservation_id,
                "customerName": customer.customer_name if customer else None,
                "emailAddress": customer.email_address if customer else None,
                "timeSlot": res.time_slot.isoformat(),
                "tableNumber": res.table_number
            })
        return jsonify({"reservations": result}), 200
    except Exception as e:
        print(f"Error fetching reservations: {e}")
        return jsonify({"message": "An error occurred while fetching reservations."}), 500

@api_bp.route('/reservations/<int:reservation_id>', methods=['GET'])
def get_reservation_by_id(reservation_id: int) -> Tuple[Dict[str, Any], int]:
    """
    Retrieves a reservation by its ID.
    """
    try:
        res = Reservation.query.get(reservation_id)
        if not res:
            return jsonify({"message": "Reservation not found."}), 404
        customer = Customer.query.get(res.customer_id)
        reservation_data = {
            "reservationId": res.reservation_id,
            "customerName": customer.customer_name if customer else None,
            "emailAddress": customer.email_address if customer else None,
            "timeSlot": res.time_slot.isoformat(),
            "tableNumber": res.table_number
        }
        return jsonify(reservation_data), 200
    except Exception as e:
        print(f"Error fetching reservation: {e}")
        return jsonify({"message": "An error occurred while fetching the reservation."}), 500
