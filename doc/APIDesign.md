# **Paw Wow API Design**

---

## Account

#### Signup

Endpoint path: /api/accounts
Endpoint method: “POST”

Request shape:
  ```json
  "username": string,
  "password": string
  ```

Response: User information and token
Response shape (JSON):
  ``` json
  {
    "access_token": "string",
    "token_type": "Bearer",
    "account": {
      "id": int,
      "username": "string"
    }
  }
  ```



## Login/LogOut

#### *Login*

Endpoint path: /token
Endpoint method: “POST”

Request shape:
  ```json
  "username": string,
  "password": string
  ```

Response: User information and token
Response shape (JSON):
  ``` json
  {
    "access_token": "string",
    "token_type": "Bearer",
    "account": {
      "id": int,
      "username": "string"
    }
  }
  ```


#### *Log out*

Endpoint path: /token
Endpoint method: DELETE

Headers:
  Authorization: Bearer token

Response: Always true
Response shape (JSON):
```json
    true
  ```

---

## Profile

#### Main Profile (*when user is logged in*)
Endpoint path: /api/profiles/{username}
Endpoint method: GET

Headers: 
  Authorization: Bearer token

Response: A detail of a profile
Response shape (JSON):
  ``` json
  {
    "id": int,
    "dog_name": "string",
    "city": "string",
    "state": "string",
    "owner_name": "string",
    "owner_description": "string",
    "account_id": int
  }
  ```

---

#### Edit profile *form*
Endpoint path: /api/profiles/{username}
Endpoint method: PATCH

Headers:
  Authorization: Bearer token

Request body:
  ``` json
  {
    "dog_name": "string",
    "city": "string",
    "state": "string",
    "owner_name": "string",
    "owner_description": "string"
  }
  ```

Response: the profile page (detail of a profile)
Response shape: 
  ``` json
  {
  "message": "string"
  }
  ```

#### Create profile 
Endpoint path: /api/profiles
Endpoint method: PUT

Headers:
  Authorization: Bearer token

Request body:
  ``` json
  {
    "dog_name": "string",
    "city": "string",
    "state": "string",
    "owner_name": "string",
    "owner_description": "string"
  }
  ```

Response: the profile page (detail of a profile)
Response shape: 
  ``` json
  {
    "id": int,
    "dog_name": "string",
    "city": "string",
    "state": "string",
    "owner_name": "string",
    "owner_description": "string",
    "account_id": int
  }
  ```

#### Vaccination *create*
Endpoint path: /api/vaccinations
Endpoint method: POST

Headers:
  Authorization: Bearer token

Request body:
  ``` json
  {
    "distemper": true,
    "parvo": true,
    "adeno": true,
    "rabies": true,
    "other": "string"
  }
  ```

Response: the profile page (detail of a profile)
Response shape: 
  ``` json
  {
    "id": int,
    "distemper": true,
    "parvo": true,
    "adeno": true,
    "rabies": true,
    "other": "string",
    "profile_id": int
  }
  ```

#### Vaccination *update*
Endpoint path: /api/vaccinations/{profile_id}
Endpoint method: PUT

Headers:
  Authorization: Bearer token

Request body:
  ``` json
  {
    "distemper": true,
    "parvo": true,
    "adeno": true,
    "rabies": true,
    "other": "string"
  }
  ```

Response: the profile page (detail of a profile)
Response shape: 
  ``` json
  {
    "id": int,
    "distemper": true,
    "parvo": true,
    "adeno": true,
    "rabies": true,
    "other": "string",
    "profile_id": int
  }
  ```

#### Characteristics *create*
Endpoint path: /api/characteristics
Endpoint method: POST

Headers:
  Authorization: Bearer token

Request body:
  ``` json
  {
    "dog_friendly": int,
    "kid_friendly": int,
    "people_friendly": int,
    "energy_level": int,
    "DOB": "2022-10-27",
    "breed": "string",
    "fixed": true,
    "size": "string",
    "gender": "string",
    "dog_bio": "string"
  }
  ```

Response: the profile page (detail of a profile)
Response shape: 
  ``` json
    "string"
  ```

#### Characteristics *update*
Endpoint path: /api/characteristics/{profile_id)}
Endpoint method: PUT

Headers:
  Authorization: Bearer token

Request body:
  ``` json
  {
    "dog_friendly": int,
    "kid_friendly": int,
    "people_friendly": int,
    "energy_level": int,
    "DOB": "2022-10-27",
    "breed": "string",
    "fixed": true,
    "size": "string",
    "gender": "string",
    "dog_bio": "string"
  }
  ```

Response: the profile page (detail of a profile)
Response shape: 
  ``` json
    "string"
  ```

#### Get Other Profile
Endpoint path: /api/profile/{id}}
Endpoint method: GET

Headers:
  Authorization: Bearer token

Request body:
  ``` json
    {
    "id": int,
  }
  ```

Response: the profile page (detail of a profile)
Response shape: 
  ``` json
    {
    "id": int,
    "dog_friendly": int,
    "kid_friendly": int,
    "people_friendly": int,
    "energy_level": int,
    "DOB": "2022-10-27",
    "breed": "string",
    "fixed": true,
    "size": "string",
    "gender": "string",
    "dog_bio": "string",
    "image": "string",
    "dog_name": "string",
    "city": "string",
    "state": "string",
    "owner_name": "string",
    "owner_description": "string",
    "distemper": true,
    "parvo": true,
    "adeno": true,
    "rabies": true,
    "other": "string"
    }
  ```


---

## Search Bar 
  Endpoint path: api/profiles
  Endpoint method: “GET”

  Query parameters:
    q: search option

  Headers:
    Authorization: Bearer token

  Response: 
    Dog search: A list of user (dog) instances (objects)
  Response shape:
  ``` json
  {
    "dogs": [
  {
  "dog_name": string,
  "img": string,
  "dog_bio": string,
  "size": string,
  "gender": string,
  "fixed": boolean,
  "city": string,
  "state": string
    }
  ]
  }
  ```

---

## Friendships

*List of Friends*

Endpoint path: /api/friendships/{id}
Endpoint method: GET

Headers:
  Authorization: Bearer token

Request body:
  ```json
    "id": int
  ```

Response: A list of friends
Response shape: 
``` json
  {
    [
      {
        "image": "string",
        "dog_name": "string",
        "city": "string",
        "state": "string",
        "id": int
      }
    ]
  }
```

*Creating a Friendship*

Endpoint path: /api/friendships/{id}
Endpoint method: POST

Headers:
  Authorization: Bearer token

Request body:
  ```json
    {
      "status": int,
      "user_one": int,
      "user_two": int
    }
  ```

Response: A friendship instance
Response shape:
```json
  {
    "id": int,
    "status": int,
    "user_one": int,
    "user_two": int
  }
```

*Updating a Friendship*

Endpoint path: /api/friendships/{user_one}/pending
Endpoint method: PUT

Headers:
  Authorization: Bearer token

Request body:
  ```json
    {
      "user_one": int
    }
  ```

Response: A friendship instance
Response shape:
  ```json
    "string"
  ```

*Deleting a friendship*

Endpoint path: /api/friendships/{user_one}/pending
Endpoint method: DELETE

Headers:
  Authorization: Bearer token

Request body:
  ```json
    {
      "user_one": int
    }
  ```

Response: Removing instance
Response shape:
```json
  "string"
```

*List of Pending Requests*

Endpoint path: /api/friendships/{user_two}/pending
Endpoint method: GET

Headers:
  Authorization: Bearer token

Request body:
  ```json
    {
      "user_two": int
    }
  ```

Response: A list of pending requests
Response shape:
```json
  { 
    [
      "dog_name": string,
      "city": string,
      "state": string,
      "user_one": int,
      "image": string
    ]
  }
```
