# Login

Used to collect a Token for a registered User.

**URL** : `/api/auth/login/`

**Method** : `POST`

**Auth required** : 
```json
{
    
    "Authorization": "`Schema ${user_name}:{password `",
    "'authorization'":" `basic ${TokenService.getAuthToken()}`",
    "'content-type'": "'application/json'",
}

```

**Data constraints**

```json
{
    "username": "[Demo User]",
    "password": "[DemoUser2020*]"
}
```

**Data example**

```json
{
    "username": "Demo User",
    "password": "Abcd1234*"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "non_field_errors": [
        "Missing '${key}' in request body"
    ]
}

{
    "field_errors": [
        "Incorrect user_name."
    ]
}

{
    "field_errors": [
        "Incorrect password."
    ]
}
```
