from fastapi.testclient import TestClient
from unittest import TestCase
from main import app
from queries.friendships import FriendshipRepository


client = TestClient(app)


class CreateFriendshipQueries(TestCase):
    def create(self, friendship):
        result = {
            "id": 6,
            "status": 1,
            "user_one": 2,
            "user_two": 1,
        }
        result.update(friendship)
        return result


def test_case():
    # Arrange
    app.dependency_overrides[FriendshipRepository] = CreateFriendshipQueries

    data = {"status": 1, "user_one": 2, "user_two": 1}

    expected = {
        "id": 6,
        "status": 1,
        "user_one": 2,
        "user_two": 1,
    }

    # Act
    response = client.post("/api/friendships/1", json=data)

    # clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected
