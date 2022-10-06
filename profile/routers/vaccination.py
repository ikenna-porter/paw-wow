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