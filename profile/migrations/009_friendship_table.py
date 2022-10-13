steps = [
    [
        ## Create a friendships table
        """
        CREATE TABLE friendships (
            friendship_id SERIAL PRIMARY KEY NOT NULL,
            friendship_status INT NOT NULL,
            user_one INTEGER REFERENCES profiles("id") NOT NULL,
            user_two INTEGER REFERENCES profiles("id") NOT NULL,
        );
        """,
        ## Drop friendships table
        """
        DROP TABLE followers;
        """
    ]   
]