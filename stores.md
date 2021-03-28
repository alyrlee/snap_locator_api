# Stores

Return SNAP store location:
1) Use geocode to render google map to user
2) User input city, state into autocomplete search
3) Google Map renders current snap location based upon search location

ReturnSnap store location by city and state based upon user search input: 

**URL** : `/api/stores/cityState`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

Return store locations based upon city state search

```json
city {
    
        "address": "34 Essex St",
        "address_line__2": "null",
        "city": "Boston",
        "county": "MIDDLESEX",
        "date_created": "2020-12-15T07:22:00.000Z",
        "latitude": "42.4563900",
        "longitude": "-71.0657580",
        "objectid": "001122",
        "state": "MA",
        "store_name": "SHAW'S SUPERMARKET 07507",
        "x": "-71.0657580",
        "y": "42.4563900",
        "zip4": "3102",
        "zip5": "2176"
}
```


