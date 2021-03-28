# Show Current User

Get the details of the currently Authenticated User along with basic
subscription information.

**URL** : `/api/users/`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

For a User with ID 1234 on the local database where that User has saved an email address and name information.

```json
{
    "id": 1234,
    "user_name": "Amy Example",
    "full_name": "Amy",
    "email": "amyJ123@example.com",
    "password": "1234Amy*"
}
```

For a user with ID 4321 on the local database but no details have been set yet.

```json
{
    "id": 4321,
    "user_name": "",
    "full_name": "",
    "email": "",
    "password":"
}
```
