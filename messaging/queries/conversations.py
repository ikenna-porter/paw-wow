from pydantic import BaseModel
from typing import List
from queries.pool import pool

class ConversationOut(BaseModel):
    id: int
    primary_user: int
    other_user: int
    read: bool
    unseen_message_count: int
    last_message: str

class ConversationIn(BaseModel):
    primary_user: int
    other_user: int
    read: bool
    unseen_message_count: int
    last_message: str

class ConversationRepository:

    def get_all(self) -> List[ConversationOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, primary_user, other_user, read, unseen_message_count, last_message
                        FROM conversations
                        """
                    )

                    return [ ConversationOut (
                        id = record[0],
                        primary_user = record[1],
                        other_user = record[2],
                        read = record[3],
                        unseen_message_count = record[4],
                        last_message = record[5],
                    )
                    for record in db 
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not retrieve conversations."}

    def create(self, conversation: ConversationIn) -> ConversationOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                """
                INSERT INTO conversations (
                      primary_user
                    , other_user
                    , read
                    , unseen_message_count
                    , last_message
                ) VALUES (%s, %s, %s, %s, %s)
                RETURNING id;
                """,
                [
                    conversation.primary_user, 
                    conversation.other_user, 
                    conversation.read, 
                    conversation.unseen_message_count, 
                    conversation.last_message,
                ]
                )

                id = result.fetchone()[0]
                old_data = conversation.dict()

                return ConversationOut(id=id, **old_data)

    def get(self, conversation_id: int) -> ConversationOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    SELECT id, primary_user, other_user, read, unseen_message_count, last_message
                    FROM conversations
                    WHERE id = %s
                    """,
                    [conversation_id]
                )
                record = result.fetchone()

                if record is None:
                    return None
                
                return ConversationOut(
                    id = record[0],
                    primary_user = record[1],
                    other_user = record[2],
		            read = record[3],
		            unseen_message_count = record[4],
                    last_message = record[5]
                )
    
    def update(self, conversation_id: int, conversation: ConversationIn) -> ConversationOut:
        try:
            with pool.connection as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        UPDATE conversations
                        SET primary_user = %s
                        ,   other_user = %s
                        ,   read = %s
                        ,   unseen_message_count = %s
                        ,   last_message = %s
                        WHERE id = %s
                        """,
                        [
                            conversation.primary_user, 
                            conversation.other_user,
                            conversation.read,
                            conversation.unseen_message_count,
                            conversation.last_message,
                            conversation_id
                        ]
                    )
                    old_data = conversation.dict()
                    return ConversationOut(id=conversation_id, **old_data)

        except Exception as e:
            print(e)
            return {"message": "Could not update conversation"}
