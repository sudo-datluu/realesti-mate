import os
from typing import Optional, List

from dotenv import load_dotenv

from fastapi import FastAPI, Body, HTTPException, status
from fastapi.responses import Response
from pydantic import ConfigDict, BaseModel, Field, EmailStr
from pydantic.functional_validators import BeforeValidator

import motor.motor_asyncio
from pymongo import ReturnDocument

from mongodb.featuremodel import FeatureModel, FeaturesCollection

from constant import au_postcodes

load_dotenv()
app = FastAPI(
    title="Real Estimate API"
)

mongoDBClient = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGODB_URI"))
db = mongoDBClient["realestimate"]
geojson_features = db["au-geojson-features"]

@app.get(
    "/features/au/{area}",
    response_model=FeaturesCollection,
    response_model_by_alias=False
)
async def get_features(area: str):
    # Todo implement other city
    if area not in au_postcodes.keys():
        raise HTTPException(status_code=404, detail="Area not found")
    area_postcodes = au_postcodes[area]
    features = await geojson_features.find(
        {
            "properties.POA_CODE": {
                 "$in": area_postcodes
            }
        }
    ).to_list(None)
    return FeaturesCollection(features=features)
