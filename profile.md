# Profile

Used to collect a Token a User profile account.

**URL** : `/api/profile/`

**Method** : `GET`

**Auth required** : 


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

**Condition** : If user is not logged in they are unable to access profile.

**Code** : `400 BAD REQUEST` on login, here:
* (profile.md)

