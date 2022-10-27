from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator
from routers.profiles import create_profile
from routers.accounts import create_account
from queries.profiles import ProfileRepository
from queries.accounts import AccountRepository 
from unittest import TestCase

# America's test to create a profile
client = TestClient(app)

class TestAccountRepository(TestCase):
    def get(self, username):
        return {"id":50, "username": "Jamie123", "hashed_password":"thisismysuperlongsercurepasswordconvertedintoahash987654321"}

    def create(self, username, password):
        return {"id":50, "username": "Jamie123", "hashed_password": "thisismysuperlongsercurepasswordconvertedintoahash987654321"}

hashed_password = "thisismysuperlongsercurepasswordconvertedintoahash987654321"

async def override_hash_password():
    return hashed_password

app.dependency_overrides[authenticator.hash_password] = override_hash_password

def test_create_account():
    # Arrange
    app.dependency_overrides[AccountRepository] = TestAccountRepository
    
    json = {
        "username": "Jamie123",
        "password": "thisismysuperlongsecurepassword123456789"
    }
    expected = {
        "id": 50,
        "username": "Jamie123",
        "hashed_password": "thisismysuperlongsercurepasswordconvertedintoahash987654321"
    }
    # Act
    response = client.post("/api/accounts", json=json)

    # Assert
    assert response.status_code == 200
    assert response.json() == expected


# AUTHENTICATION CHECK
# Arrange
# fakeAccount = {"id":50, "username":"Jamie123"}

# fakeAccountToken = {
#     "access_token": "thisisareallylong10000accesstoken999999",
#     "token_type": "Bearer",
#     "account": fakeAccount,
# }

# # Act
# async def account_out_override():
#     return fakeAccount

# app.dependency_overrides[authenticator.try_get_current_account_data] = account_out_override

# def test_get_account():
#     response = client.get("/token", cookies={"fastapi_token":"thisisareallylong10000accesstoken999999"})

# # Assert
#     assert response.status_code == 200
#     print(response.json())
#     assert response.json() == fakeAccountToken

# USE AUTHENTICATION TO CREATE A PROFILE
# def test_create_profile():
#     #Arrange
#     app.dependency_overrides[create_profile] = test_create_profile

#     json = {
#         "dog_name": "Koko",
#         "city": "Portland",
#         "state": "OR",
#         "owner_name": "Jamie",
#         "owner_description": "Jamie loves the outdoors."
#     }
#     expected = {
#         "id": 50,
#         "dog_name": "Koko",
#         "city": "Portland",
#         "state": "OR",
#         "owner_name": "Jamie",
#         "owner_description": "Jamie loves the outdoors.",
#         "account_id": 50
#     }

#     #Act
#     response = client.post("/api/profiles", json=json, data=test_get_account())

#     #Assert
#     assert response.status_code == 200
#     assert response.json() == expected

#     app.dependency_overrids = {}


