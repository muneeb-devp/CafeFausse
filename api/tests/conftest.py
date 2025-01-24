import pytest
import tempfile
import os
import sys

# Add the parent directory to the path so we can import our modules
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# pylint: disable=wrong-import-position
from src.app import create_app
from src.models import db
from src.config import TestingConfig


@pytest.fixture
def app():
    """Create and configure a new app instance for each test."""
    # Create a temporary database file
    db_fd, db_path = tempfile.mkstemp()
    
    # Configure the app for testing with TestingConfig
    app = create_app(TestingConfig)
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
    
    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()
    
    # Clean up the temporary database file
    os.close(db_fd)
    os.unlink(db_path)


@pytest.fixture
def client(app):
    """Create a test client for the app."""
    return app.test_client()


@pytest.fixture
def runner(app):
    """Create a test runner for the app's Click commands."""
    return app.test_cli_runner()
