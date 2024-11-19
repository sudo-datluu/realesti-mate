import os
from typing import Optional, List

from fastapi import FastAPI, Body, HTTPException, status
from fastapi.responses import Response
from pydantic import ConfigDict, BaseModel, Field, EmailStr
from pydantic.functional_validators import BeforeValidator

from typing_extensions import Annotated

from bson import ObjectId
import motor.motor_asyncio
from pymongo import ReturnDocument

from mongodb.featuremodel import FeatureModel, FeaturesCollection

app = FastAPI(
    title="Real Estimate API"
)
mongoDBClient = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGODB_URI"))
db = mongoDBClient["realestimate"]
geojson_features = db["au-geojson-features"]

PyObjectedId = Annotated[str, BeforeValidator(str)]

@app.get(
    "/features/au/{area}",
    response_model=FeaturesCollection,
    response_model_by_alias=False
)
async def get_features(area: str):
    # Todo implement other city
    if area not in ["sydney"]:
        raise HTTPException(status_code=404, detail="Area not found")

