steps = [
    [
        ## Create the table
        """
        CREATE TABLE characteristics (
            id SERIAL PRIMARY KEY NOT NULL,
            DOB DATE NOT NULL,
            dog_friendly SMALLINT NOT NULL,
            kid_friendly SMALLINT NOT NULL,
            people_friendly SMALLINT NOT NULL,
            energy_level SMALLINT NOT NULL,
            playfulness SMALLINT NOT NULL
        );
        """,
        ## Drop the table
        """
        DROP TABLE characteristics;
        """
    ]
]