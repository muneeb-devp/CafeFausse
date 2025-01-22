from flask import Flask
from flask_cors import CORS
from .config import Config
from .models import db, create_tables
from .routes import api_bp
import os


def create_app(config_class=None) -> Flask:
    app: Flask = Flask(__name__)

    allowed_origins = [
        'http://localhost:3000', 'http://127.0.0.1:3000',
        'http://ui:3000',  # Docker internal communication
    ]

    custom_origin = os.getenv('FRONTEND_URL')
    if custom_origin:
        allowed_origins.append(custom_origin)

    CORS(app,
         origins=allowed_origins,
         methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
         allow_headers=['Content-Type', 'Authorization'],
         supports_credentials=True)


    app.config.from_object(config_class or Config)

    if app.config.get('SQLALCHEMY_DATABASE_URI'):
        db.init_app(app)
        app.register_blueprint(api_bp, url_prefix='/api')

        # Only create tables if not in testing mode
        if not app.config.get('TESTING'):
            with app.app_context():
                create_tables()
    else:
        # For testing, we'll initialize DB later
        db.init_app(app)
        app.register_blueprint(api_bp, url_prefix='/api')

    return app


if __name__ == '__main__':
    app: Flask = create_app()
    app.run(debug=True, host='0.0.0.0', port=8000)
