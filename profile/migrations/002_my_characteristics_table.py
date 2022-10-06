steps = [
    [
        ## Create the table
        """
        CREATE TABLE characteristics (
            DOB DATE NOT NULL,
            dog_friendly SMALLINT NOT NULL,
            well_trained SMALLINT NOT NULL,
            energy_level SMALLINT NOT NULL,
            playfulness SMALLINT NOT NULL,
            profile_id INTEGER REFERENCES profile("id") ON DELETE CASCADE
        );
        """,
        ## Drop the table
        """
        DROP TABLE characteristics;
        """
    ]
]