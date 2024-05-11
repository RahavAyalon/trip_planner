import os

from pymongo import MongoClient

client = MongoClient(
    os.getenv("MONGODB_URI"))


def get_database(name):
    """Retrieve a database by name."""
    return client[name]


def get_collection(db_name, collection_name):
    """Retrieve a collection from a specific database."""
    db = get_database(db_name)
    return db[collection_name]