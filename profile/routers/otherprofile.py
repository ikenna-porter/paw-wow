from fastapi import APIRouter, Depends
from queries.otherprofile import OtherProfileRepository, OtherProfile

router = APIRouter()

@router.get("/api/profile/{id}", response_model = OtherProfile)
def get_single_profile(
    id: int,
    repo: OtherProfileRepository = Depends()

):
    return repo.get_single_profile(id)