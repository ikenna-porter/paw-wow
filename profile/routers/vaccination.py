from fastapi import APIRouter, Depends 
from queries.vaccination import (
    VaccinationIn, 
    VaccinationOut, 
    VaccinationRepository
)

router = APIRouter()

@router.post("/api/vaccination", response_model = VaccinationOut)
def create_vaccination(vaccination: VaccinationIn, repo: VaccinationRepository = Depends()):
    return repo.create(vaccination)

@router.put("/api/vaccination/{id}", response_model = VaccinationOut)
def update_vaccination(
    id: int,
    vaccination: VaccinationIn,
    repo: VaccinationRepository = Depends()
) -> VaccinationOut:
    return repo.update(id, vaccination)

@router.delete("/api/vaccination/{id}", response_model = bool)
def delete_vaccination(
    id: int,
    repo: VaccinationRepository = Depends()
) -> bool:
    return repo.delete(id)