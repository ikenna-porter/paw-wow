steps = [
    [
     ## Create an follower table
        """
        CREATE TABLE followers (
            follower INTEGER REFERENCES profiles("id") PRIMARY KEY NOT NULL,
            followee INTEGER REFERENCES profiles("id") NOT NULL
        );
        """,
        #Destroy follower
        """
        DROP TABLE followers;
        """
    ]   
]