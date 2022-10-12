steps = [
    [
        ## Create an user value object table
        """
        CREATE TABLE user_vo (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            picture_url VARCHAR(300),
            profile_id INTEGER NOT NULL,
            profile_url VARCHAR(300),
        );
        """,

        ## Destroy an user value object table
        """
        DESTROY TABLE user_vo;
        """
    ],
    [
        ## Create a conversations table
        """
        CREATE TABLE conversations (
            id SERIAL PRIMARY KEY NOT NULL,
            user VARCHAR(100) REFERENCES user_vo(id),
            other_user VARCHAR(100) REFERENCES user_vo(id),
            read BOOL DEFAULT False,
            unseen_message_count INTEGER,
            last_message TEXT
        );
        """,

        ## Destroy a conversations table
        """
        DROP TABLE conversations;
        """
    ],
    [
        ## Create an messages table
        """
        CREATE TABLE messages (
            id SERIAL PRIMARY KEY NOT NULL,
            sender VARCHAR(100) NOT NULL REFERENCES user_vo(id),
            recipient VARCHAR(100) NOT NULL REFERENCES user_vo(id),
            timestamp TIMESTAMPTZ NOT NULL,
            content TEXT NOT NULL,
            read BOOL NOT NULL DEFAULT False,
            conversation_id SERIAL NOT NULL REFERENCES chats(id)
        );
        """,

        ## Destroy an messages table
        """
        DESTROY TABLE messages;
        """
    ],
]