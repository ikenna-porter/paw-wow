# Data Models

*For Profiles*

### Accounts
| Name | Type | Not Null | Primary Key |
| --- | --- | --- | --- |
| id | Int | True | Yes |
| hashed_password | Str | True | No |
| username | Str | True | No |

### Profiles
| Name | Type | Not Null | Primary Key |
| --- | --- | --- | --- |
| id | Int | True | Yes | 
| dog_name | Str | True | No |
| city | Str | True | No |
| state | Str | True | No |
| owner_name | Str | False | No |
| owner_description | Str | False | No |
| account_id | Int | False | No |

### Profile Pictures
| Name | Type | Not Null | Primary Key |
| --- | --- | --- | --- |
| id | Int | True | Yes |
| image_name | Str | False | No |
| image | Str | False | No |
| profile_id | Int | False | No |

### Characteristics 
| Name | Type | Not Null | Primary Key |
| --- | --- | --- | --- |
| id | Int | True | Yes |
| dog_friendly | Sml Int | False | No |
| kid_friendly | Sml Int | False | No |
| people_friendly | Sml Int | False | No |
| energy_level | Sml Int | False | No |
| dob | Date | False | No |
| breed | Str | False | No |
| fixed | Bool | False | No |
| size | Str | False | No |
| gender | Str | False | No |
| dog_bio | Str | False | No |
| profile_id | Int | True | No |

### Vaccination Records
| Name | Type | Not Null | Primary Key |
| --- | --- | --- | --- |
| id | Int | True | Yes |
| distemper | Bool | False | No |
| parvo | Bool | False | No |
| adeno | Bool | False | No |
| rabies | Bool | False | No |
| other | Str | False | No |
| profile_id | Int | True | No |

*For Friendships*

### Friendships
| Name | Type | Not Null | Primary Key |
| --- | --- | --- | --- |
| id | Int | True | Yes | 
| status | Int | True | No |
| user_one | Int | True | No |
| user_two | Int | True | No |

*For Messaging*

### Conversations
| Name | Type | Not Null | Primary Key |
| --- | --- | --- | --- |
| id | Int | True | Yes |
| primary_user | Int | False | No |
| other_user | Int | False | No |

### Messages
| Name | Type | Not Null | Primary Key |
| --- | --- | --- | --- |
| id | Int | True | Yes |
| sender | Int | True | No |
| recipient | Int | True | No |
| timestamp | Time | True | No |
| content | Str | True | No |
| conversation_id | Int | True | No |
