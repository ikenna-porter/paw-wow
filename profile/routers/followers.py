from fastapi import APIRouter, Depends, Response
from queries.followers import (
    FollowerRepository, 
    FollowerIn, 
    FollowerOut
)

router = APIRouter()

@router.post("/api/follower", response_model = FollowerOut)
def create_follower(
    follower: FollowerIn,
    repo: FollowerRepository = Depends()
):
    return repo.create(follower)