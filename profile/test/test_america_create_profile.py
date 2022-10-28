from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator
from queries.profiles import ProfileRepository
from unittest import TestCase

# America's test to create a profile
client = TestClient(app)

# AUTHENTICATION CHECK
# Arrange
fakeAccount = {"id": 50, "username": "Jamie123"}

fakeAccountToken = {
    "access_token": "thisisareallylong10000accesstoken999999",
    "token_type": "Bearer",
    "account": fakeAccount,
}

# Act
async def account_out_override():
    return fakeAccount


app.dependency_overrides[
    authenticator.try_get_current_account_data
] = account_out_override


def test_get_account():
    response = client.get(
        "/token", cookies={"fastapi_token": "thisisareallylong10000accesstoken999999"}
    )

    # Assert
    assert response.status_code == 200
    print(response.json())
    assert response.json() == fakeAccountToken


class FakeProfileRepository(TestCase):
    def create(self, profile, account_data):
        return {
            "id": 50,
            "dog_name": "Koko",
            "city": "Portland",
            "state": "OR",
            "owner_name": "Jamie",
            "owner_description": "Jamie loves the outdoors.",
            "account_id": 50,
<<<<<<< HEAD
        }


# USE AUTHENTICATION TO CREATE A PROFILE
def test_create_profile():
    # Arrange
=======
            "social_media": "instagram.com/link"
        }

# # USE AUTHENTICATION TO CREATE A PROFILE
def test_create_profile():
#     #Arrange
>>>>>>> main
    app.dependency_overrides[ProfileRepository] = FakeProfileRepository

    json = {
        "dog_name": "Koko",
        "city": "Portland",
        "state": "OR",
        "owner_name": "Jamie",
        "owner_description": "Jamie loves the outdoors.",
<<<<<<< HEAD
=======
        "social_media": "instagram.com/link"
>>>>>>> main
    }
    expected = {
        "id": 50,
        "dog_name": "Koko",
        "city": "Portland",
        "state": "OR",
        "owner_name": "Jamie",
        "owner_description": "Jamie loves the outdoors.",
        "account_id": 50,
<<<<<<< HEAD
=======
        "social_media": "instagram.com/link"
>>>>>>> main
    }

    # Act
    response = client.post("/api/profiles", json=json, data=test_get_account())

    # Assert
    assert response.status_code == 200
    assert response.json() == expected

    app.dependency_overrides = {}
