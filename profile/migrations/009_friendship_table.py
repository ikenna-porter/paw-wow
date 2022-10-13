steps = [
    [
        ## Create a friendships table
        """
        CREATE TABLE friendships (
            id SERIAL PRIMARY KEY NOT NULL,
            status INT NOT NULL,
            user_one INTEGER REFERENCES profiles("id") NOT NULL,
            user_two INTEGER REFERENCES profiles("id") NOT NULL
        );
        """,
        ## Drop friendships table
        """
        DROP TABLE followers;
        """
    ]   
]