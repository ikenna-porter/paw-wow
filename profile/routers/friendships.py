from fastapi import APIRouter, Depends, Response
from queries.friendships import (
    FriendshipRepository, 
    FriendshipIn, 
    FriendshipOut
)

router = APIRouter()

@router.post("/api/friendships", response_model = FriendshipOut)
def create_friendship(
    friendship: FriendshipIn,
    repo: FriendshipRepository = Depends()
):
    return repo.create(friendship)