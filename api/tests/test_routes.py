"""Tests for API routes."""
import pytest
import json
from datetime import datetime, timedelta


class TestHealthEndpoint:
    """Tests for the health check endpoint."""

    def test_health_check_returns_200(self, client):
        """Test that health endpoint returns 200 status."""
        response = client.get('/api/health')
        assert response.status_code == 200
        
    def test_health_check_returns_json(self, client):
        """Test that health endpoint returns JSON response."""
        response = client.get('/api/health')
        assert response.content_type == 'application/json'
        
    def test_health_check_response_format(self, client):
        """Test that health endpoint returns expected response format."""
        response = client.get('/api/health')
        data = json.loads(response.data)
        assert 'status' in data
        assert data['status'] == 'ok'


class TestReservationEndpoint:
    """Tests for the reservation endpoints."""

    def test_create_reservation_success(self, client):
        """Test successful reservation creation."""
        # Calculate a future date for the reservation
        future_date = datetime.now() + timedelta(days=7)
        future_datetime_str = future_date.replace(
            hour=19, minute=0).isoformat()
        
        reservation_data = {
            'customerName': 'John Doe',
            'emailAddress': 'john@example.com',
            'phoneNumber': '555-1234',
            'numGuests': 4,
            'timeSlot': future_datetime_str,
            'newsletterSignup': True
        }
        
        response = client.post(
            '/api/reservations',
            data=json.dumps(reservation_data),
            content_type='application/json'
        )
        
        assert response.status_code == 201
        data = json.loads(response.data)
        assert 'message' in data
        assert 'reservationDetails' in data

    def test_create_reservation_missing_required_fields(self, client):
        """Test reservation creation with missing required fields."""
        incomplete_data = {
            'customer_name': 'John Doe',
            # Missing email_address, party_size, etc.
        }
        
        response = client.post(
            '/api/reservations',
            data=json.dumps(incomplete_data),
            content_type='application/json'
        )
        
        assert response.status_code == 400

    def test_create_reservation_invalid_email(self, client):
        """Test reservation creation with invalid email."""
        future_date = datetime.now() + timedelta(days=7)
        future_datetime_str = future_date.replace(
            hour=19, minute=0).isoformat()
        
        reservation_data = {
            'customerName': 'John Doe',
            'emailAddress': 'invalid-email',
            'numGuests': 4,
            'timeSlot': future_datetime_str
        }
        
        response = client.post(
            '/api/reservations',
            data=json.dumps(reservation_data),
            content_type='application/json'
        )
        
        assert response.status_code == 400
        data = json.loads(response.data)
        assert 'message' in data

    def test_create_reservation_past_date(self, client):
        """Test reservation creation with past date."""
        past_date = datetime.now() - timedelta(days=1)
        
        reservation_data = {
            'customer_name': 'John Doe',
            'email_address': 'john@example.com',
            'party_size': 4,
            'reservation_date': past_date.strftime('%Y-%m-%d'),
            'reservation_time': '19:00'
        }
        
        response = client.post(
            '/api/reservations',
            data=json.dumps(reservation_data),
            content_type='application/json'
        )
        
        assert response.status_code == 400

    def test_create_reservation_invalid_party_size(self, client):
        """Test reservation creation with invalid party size."""
        future_date = datetime.now() + timedelta(days=7)
        
        reservation_data = {
            'customer_name': 'John Doe',
            'email_address': 'john@example.com',
            'party_size': 0,  # Invalid party size
            'reservation_date': future_date.strftime('%Y-%m-%d'),
            'reservation_time': '19:00'
        }
        
        response = client.post(
            '/api/reservations',
            data=json.dumps(reservation_data),
            content_type='application/json'
        )
        
        assert response.status_code == 400

    def test_get_reservations_list(self, client):
        """Test getting list of reservations."""
        response = client.get('/api/reservations')
        
        assert response.status_code == 200
        data = json.loads(response.data)
        assert 'reservations' in data
        assert isinstance(data['reservations'], list)

    def test_get_specific_reservation(self, client):
        """Test getting a specific reservation by ID."""
        # First create a reservation
        future_date = datetime.now() + timedelta(days=7)
        
        reservation_data = {
            'customer_name': 'Jane Doe',
            'email_address': 'jane@example.com',
            'party_size': 2,
            'reservation_date': future_date.strftime('%Y-%m-%d'),
            'reservation_time': '18:00'
        }
        
        create_response = client.post(
            '/api/reservations',
            data=json.dumps(reservation_data),
            content_type='application/json'
        )
        
        if create_response.status_code == 201:
            create_data = json.loads(create_response.data)
            reservation_id = create_data['reservation_id']
            
            # Now get the specific reservation
            get_response = client.get(f'/api/reservations/{reservation_id}')
            
            assert get_response.status_code == 200
            get_data = json.loads(get_response.data)
            assert 'customer_name' in get_data
            assert get_data['customer_name'] == 'Jane Doe'

    def test_get_nonexistent_reservation(self, client):
        """Test getting a reservation that doesn't exist."""
        response = client.get('/api/reservations/99999')
        assert response.status_code == 404


class TestNewsletterEndpoint:
    """Tests for the newsletter subscription endpoint."""

    def test_newsletter_signup_success(self, client):
        """Test successful newsletter signup."""
        signup_data = {
            'email': 'newsletter@example.com'
        }
        
        response = client.post(
            '/api/newsletter',
            data=json.dumps(signup_data),
            content_type='application/json'
        )
        
        # The response code might vary based on implementation
        assert response.status_code in [200, 201]

    def test_newsletter_signup_invalid_email(self, client):
        """Test newsletter signup with invalid email."""
        signup_data = {
            'email': 'invalid-email'
        }
        
        response = client.post(
            '/api/newsletter',
            data=json.dumps(signup_data),
            content_type='application/json'
        )
        
        assert response.status_code == 400

    def test_newsletter_signup_missing_email(self, client):
        """Test newsletter signup with missing email."""
        signup_data = {}
        
        response = client.post(
            '/api/newsletter',
            data=json.dumps(signup_data),
            content_type='application/json'
        )
        
        assert response.status_code == 400


class TestAPIErrorHandling:
    """Tests for API error handling."""

    def test_invalid_json_request(self, client):
        """Test API response to invalid JSON."""
        response = client.post(
            '/api/reservations',
            data='invalid json',
            content_type='application/json'
        )
        
        assert response.status_code == 400

    def test_unsupported_http_method(self, client):
        """Test API response to unsupported HTTP methods."""
        response = client.patch('/api/health')
        assert response.status_code == 405

    def test_nonexistent_endpoint(self, client):
        """Test API response to nonexistent endpoints."""
        response = client.get('/nonexistent-endpoint')
        assert response.status_code == 404
