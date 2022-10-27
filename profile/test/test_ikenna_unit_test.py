from fastapi.testclient import TestClient
from main import app
from queries.friendships import FriendshipRepository
from routers.friendships import create_friendship


client = TestClient(app)

#Arrange
app.dependency_overrides[create_friendship] = FriendshipRepository
data = {
  "status": 1,
  "user_one": 2,
  "user_two": 1
}

expected = {
  "id": 6,
  "status": 1,
  "user_one": 2,
  "user_two": 1
}

#Act
response = client.post("/api/friendships/1", json=data)

#clean up
app.dependency_overrides = {}

#Assert
assert response.status_code == 200
assert response.json() == expected
