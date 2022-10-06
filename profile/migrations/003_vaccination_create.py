steps = [
    [
    ## Create a vaccination table
    """
    CREATE TABLE vaccination (
        id SERIAL PRIMARY KEY NOT NULL,
        profile_id INTEGER REFERENCES profile("id") ON DELETE CASCADE,
        distemper BOOL NULL,
        parvo BOOL NULL,
        adeno BOOL NULL,
        rabies BOOL NULL,
        other VARCHAR(100) NULL
    );
    """,

    ## Drop a vaccination table
    """
    DROP TABLE vaccination;
    """
    ]
]