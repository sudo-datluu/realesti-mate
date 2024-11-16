import json
import os
from dotenv import load_dotenv
from pymongo import MongoClient

def load_geojson_to_mongodb(file_path, db_name, collection_name):
    load_dotenv()
    mongodb_uri = os.getenv('MONGODB_URI')
    client = MongoClient(mongodb_uri)
    
    db = client[db_name]
    collection = db[collection_name]

    # Load the GeoJSON file
    with open(file_path, 'r') as file:
        geojson_data = json.load(file)

    # Extract features' properties and insert into MongoDB
    features = geojson_data.get('features', [])
    for feature in features:
        collection.insert_one(feature)

    print(f"Inserted {len(features)} features into {collection_name} collection.")

if __name__ == "__main__":
    file_path = './au-postcodes.geojson'
    db_name = 'realestimate'
    collection_name = 'au-geojson-features'
    load_geojson_to_mongodb(file_path, db_name, collection_name)
