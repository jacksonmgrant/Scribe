from pymongo import MongoClient
import json


def get_database():

    with open("ScribeBE/config.json", "r") as config_file:
        config_data = json.load(config_file)

    # Access a specific key-value pair
    CONNECTION_STRING = config_data["CONNECTION_STRING"]

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client["ScribeDB"]

def add_note(note):

    # Get the database
    dbname = get_database()

    # Get the collection
    collection = dbname["notes"]

    # Insert a document into the collection
    collection.insert_one(note.dict())


# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":

    # Get the database
    dbname = get_database()

    # Print the database name

    print(dbname)
