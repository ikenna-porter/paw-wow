from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool
from datetime import datetime

class MessageOut(BaseModel):
    id: int
    sender: int
    recipient: int
    timestamp: datetime
    content: str
    read: bool
    conversation_id: int

class MessageIn(BaseModel):
    sender: int
    recipient: int
    timestamp: datetime
    content: str
    read: bool
    conversation_id: int

class MessageRepository:
    def get_all(self, conversation_id: int) -> List[MessageOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT 
                          id
                        , sender
                        , recipient
                        , timestamp
                        , content
                        , read
                        , conversation_id
                        FROM messages
                        WHERE conversation_id = %s;
                        """,
                        [conversation_id]
                    )

                    result = [ MessageOut (
                        id = record[0],
                        sender = record[1],
                        recipient = record[2],
                        timestamp = record[3],
                        content = record[4],
                        read = record[5],
                        conversation_id = record[6]
                    )
                    for record in db 
                    ]

                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not retrieve chat history."}

    def get_one(self, message_id: int)  -> MessageOut:
        # try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    message = db.execute(
                        """
                        SELECT * 
                        FROM messages
                        WHERE id = %s
                        """,
                        [message_id]
                    )
                    record = message.fetchone()

                    # if record is None:
                    #     return None
                     
                    result = MessageOut(
                        id = record[0],
                        sender = record[1],
                        recipient = record[2],
                        timestamp = record[3],
                        content = record[4],
                        read = record[5],
                        conversation_id = record[6]
                    )
                    print("################################", result)
                    return result


        # except Exception as e:
        #     print(e)
        #     return {"message": "Error in retrieving message."}

    def create(self, message: MessageIn) -> MessageOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                """
                INSERT INTO messages (
                      sender
                    , recipient
                    , timestamp
                    , content
                    , read
                    , conversation_id
                ) VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING id;

                """,
                [
                    message.sender, 
                    message.recipient, 
                    message.timestamp, 
                    message.content, 
                    message.read, 
                    message.conversation_id
                ]
                )
                id = result.fetchone()[0]

                old_data = message.dict()
                return MessageOut(id=id, **old_data)

    def delete(self, message_id:int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM messages
                        WHERE id = %s;
                        """,
                        [message_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False
    
        