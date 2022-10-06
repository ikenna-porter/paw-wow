steps = [
    [
    ## Create a vaccination table
    """
    CREATE TABLE vaccination_records (
        id SERIAL PRIMARY KEY NOT NULL,
        distemper BOOL NULL,
        parvo BOOL NULL,
        adeno BOOL NULL,
        rabies BOOL NULL,
        other VARCHAR(100) NULL
    );
    """,

    ## Drop a vaccination table
    """
    DROP TABLE vaccination_records;
    """
    ]
]