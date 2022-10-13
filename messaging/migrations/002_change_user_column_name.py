steps = [
        """
        ALTER TABLE conversations 
        RENAME COLUMN primary_user 
        TO current_user;
        """
]