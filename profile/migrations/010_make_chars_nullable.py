steps = [ 
    [ 
        """
        DROP TABLE characteristics;
        """,

        """
        CREATE TABLE characteristics (
            id SERIAL PRIMARY KEY NOT NULL,
            DOB DATE NOT NULL,
            dog_friendly SMALLINT NOT NULL,
            kid_friendly SMALLINT NOT NULL,
            people_friendly SMALLINT NOT NULL,
            energy_level SMALLINT NOT NULL,
            fixed BOOL NOT NULL,
            size TEXT NOT NULL check(size = 'Small' or size = 'Medium' or size = 'Large'),
            profile_id INTEGER REFERENCES profiles("id") ON DELETE CASCADE
        );
        """
    ],
    [ 
        """
        CREATE TABLE characteristics (
            id SERIAL PRIMARY KEY NOT NULL,
            dog_friendly SMALLINT,
            kid_friendly SMALLINT,
            people_friendly SMALLINT,
            energy_level SMALLINT,
            DOB DATE,
            breed VARCHAR(100),
            fixed BOOL,
            size TEXT check(size = 'Small' or size = 'Medium' or size = 'Large'),
            gender TEXT check(gender = 'Female' or gender = 'Male'),
            dog_bio TEXT,
            profile_id INTEGER UNIQUE NOT NULL REFERENCES profiles("id") ON DELETE CASCADE
        );
        """,

        """
        DROP TABLE characteristics;
        """
    ]
]