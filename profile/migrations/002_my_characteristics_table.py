steps = [
    [
        ## Create the table
        """
        CREATE TABLE characteristics (
            id SERIAL PRIMARY KEY NOT NULL,
            DOB DATE NOT NULL,
            dog_friendly SMALLINT NOT NULL,
            well_trained SMALLINT NOT NULL,
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