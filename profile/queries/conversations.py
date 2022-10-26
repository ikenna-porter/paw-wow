from pydantic import BaseModel
from typing import List, Optional
from queries.pool import pool

class ConversationOut(BaseModel):
    id: int
    primary_user: int
    other_user: int
    other_user_dog_name: Optional[str]
    other_user_picture: Optional[str]
    
class ConversationIn(BaseModel):
    primary_user: int
    other_user: int

class ConversationRepository:
    def get_all(self, primary_user) -> List[ConversationOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT 
                            conversations.id
                            , conversations.primary_user
                            , conversations.other_user
                            , profiles.dog_name
                            , profile_pictures.image
                        FROM profiles 
                        LEFT JOIN conversations
                        ON profiles.id = conversations.other_user
                        LEFT JOIN profile_pictures
                        ON profiles.id = profile_pictures.profile_id
                        WHERE conversations.primary_user = %(primary_user)s
                        OR conversations.other_user = %(primary_user)s;
                        """,
                        {"primary_user": primary_user}
                    )
                    result = []
                    for record in db:
                        conversation = ConversationOut (
                            id = record[0],
                            primary_user = record[1],
                            other_user = record[2],
                            other_user_dog_name = record[3],
                            other_user_picture = record[4]
                        )
                        result.append(conversation)
                    return result
                    
        except Exception as e:
            print(e)
            return {"message": "Could not retrieve conversations."}

    def create(self, conversation: ConversationIn) -> ConversationOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                    """
                    INSERT INTO conversations (primary_user, other_user) 
                    VALUES (%s, %s)
                    RETURNING id;
                    """,
                    [ conversation.primary_user, conversation.other_user]
                    )

                    id = result.fetchone()[0]
                    old_data = conversation.dict()
                    print(conversation)
                    print(id)
                    print(old_data)

                    return ConversationOut(id=id, **old_data)
        except Exception as e:
            print(e)


    def get(self, conversation_id: int) -> ConversationOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    SELECT conversations.id
                    , conversations.primary_user
                    , conversations.other_user
                    , profiles.dog_name
                    , profile_pictures.image
                    FROM profiles
                    LEFT JOIN conversations
                    ON profiles.id = conversations.primary_user
                    LEFT JOIN profile_pictures
                    ON profiles.id = profile_pictures.profile_id
                    WHERE conversations.id = %s;
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
                    other_user_dog_name = record[3],
                    other_user_picture = record[4]
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
                        WHERE id = %s
                        """,
                        [
                            conversation.primary_user, 
                            conversation.other_user,
                            conversation_id
                        ]
                    )
                    old_data = conversation.dict()
                    return ConversationOut(id=conversation_id, **old_data)

        except Exception as e:
            print(e)
            return {"message": "Could not update conversation"}
