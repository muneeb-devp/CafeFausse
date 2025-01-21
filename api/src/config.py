import os
from typing import Optional


class Config:
    SQLALCHEMY_DATABASE_URI: Optional[str] = os.environ.get('DB_CONN_STR')
    SQLALCHEMY_TRACK_MODIFICATIONS: bool = False


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
