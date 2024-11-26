from pydantic import ConfigDict, BaseModel, Field, EmailStr
from typing import Optional, List
from bson import ObjectId
from pydantic.functional_validators import BeforeValidator
from typing_extensions import Annotated

PyObjectId = Annotated[str, BeforeValidator(str)]

class Geometry(BaseModel):
    type: str
    coordinates: List[List[List[float]]] | List[List[List[List[float]]]]

class Properties(BaseModel):
    POA_CODE: str
    POA_NAME: str
    SQKM: float

class FeatureModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    type: str
    geometry: Geometry
    properties: Properties
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [130.85017129599998, -12.45301227060217],
                        [130.849742528, -12.4554665731021],
                        [130.85192067199998, -12.47053443460165],
                        [130.844300896, -12.47371103260155],
                        [130.841802944, -12.467260526601747],
                        [130.833309568, -12.460605910101945],
                        [130.83335568, -12.456840142602058],
                        [130.83766684800003, -12.452448390602187],
                        [130.85017129599998, -12.45301227060217]
                    ]
                ]
            },
            "properties": {
                "POA_CODE": "0800",
                "POA_NAME": "0800",
                "SQKM": 3.12306415134995
            }
        }
    })

class FeaturesCollection(BaseModel):
    """
    Container holding a list of `Geojson Feature` objects.
    """
    features: List[FeatureModel]