from fastapi import APIRouter, Depends 
from typing import List, Optional, Union
from queries.characteristics import CharsIn, CharsOut, CharacteristicsRepository


router = APIRouter()

@router.post("/api/characteristics")
def create_characteristics(
    characteristic: CharsIn,
    repo: CharacteristicsRepository = Depends()
):
    return repo.create(characteristic)

@router.delete("/api/characteristics/{characteristics_id}")
def delete_characteristics(
    characteristics_id: int,
    repo: CharacteristicsRepository = Depends(),
) -> bool:
    return repo.delete(characteristics_id)
    

@router.put("/api/characteristics/{characteristics_id}")
def update_characteristics(
    characteristics_id: int,
    characteristic: CharsIn,
    repo: CharacteristicsRepository = Depends(),
    ) -> CharsOut:
    return repo.update(characteristics_id, characteristic)