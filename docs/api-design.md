This is where we will design our APIs

<!-- Conversations -->

<!-- Get a list of conversations -->
* Endpoint path: /conversations_list
* Endpoint method: GET

* Headers:
    * Authorization: Bearer token

* Response: A list of conversations
* Response shape:
    ```json
    {
        "conversations": [
            conversation: { 
                recipient: object, #picture_url and name come from here
                date_of_last_message: date,
                time_of_last_message: time,
                content_of_last_message: string,
            }
        ]
    }

<!-- Get a conversation detail -->
* Endpoint path: /conversation/id
* Endpoint method: GET

* Headers:
    * Authorization: Bearer token

* Response: A detail of a conversation
* Response shape:
    ```json
    {
        "recipient": object,
        "messages": [
            message: { 
                recipient: object, #picture_url and name come from here
                sender: object, #picture_url and name come from here
                date: date,
                time: time,
                content: string,
            },
        ]
    }
    ```

<!-- Post message to a conversation -->
* Endpoint path: /conversation/id
* Endpoint method: POST

* Headers:
    * Authorization: Bearer token

* Request body:
    ```json
    {
        "recipient": object,
        "messages": [
            message: { 
                recipient: object, #picture_url and name come from here
                sender: object, #picture_url and name come from here
                date: date,
                time: time,
                content: string,
            },
        ]
    }
    ```

* Response: A detail of a conversation
* Response shape:
    ```json
    {
      "success": boolean,
      "message": string
    }
    ```


<!-- Sign Up Endpoint -->
* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: string
  * password: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        «key»: type»,
      },
      "token": string,
      "content": {
        "username": string,
        "password": string,
        "email": string,
        "city": string,
        "state": string
      }
    }
    ```