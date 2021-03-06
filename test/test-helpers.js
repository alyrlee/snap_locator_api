const bcrypt = require('bcryptjs')


function makeUsersArray() {
    return [
      {
        id: 1,
        user_name: 'DemoUser2020',
        password: 'DemoUserSnap*',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
    ]
} 
function makeStoresArray () {
    return [
    { 
      "ObjectId": 1,"Store_Name": "DOLLARTREE 8500", "Address": "978 SE Broad St","Address_Line__2": null, "City": "Metter", "State": "GA",  "Zip5": "30439", "Zip4": "3933",  "County": "CANDLER",  "Longitude": -82.055046, "Latitude": 32.396797 
    },               
{
     "ObjectId": 2,"Store_Name": "Mercado's Meat Market No", "Address": "560 N Tehama St","Address_Line__2": null, "City": "Willows", "State": "CA",  "Zip5": "95988", "Zip4": "2533",  "County": "GLENN", "Longitude": -122.19395, "Latitude": 39.526478
     }, 

{
     "ObjectId": 3, "Store_Name": "Meijer Gas Station 68", "Address": "37201 Warren Rd", "Address_Line__2": null, "City": "Westland", "State": "MI", "Zip5": "48185", "Zip4": "7219", "County": "WAYNE", "Longitude": -83.405739, "Latitude": 42.332569 
    }, 
 {
      "ObjectId": 4, "Store_Name": "Asian Grocery ", "Address": "5669 Farm Pond Ln", "Address_Line__2": null, "City": "Charlotte", "State": "NC", "Zip5": "28212", "Zip4": "3777", "County": "MECKLENBURG", "Longitude": -80.738525, "Latitude": 35.203922 
    }, 
 { 
     "ObjectId": 5, "Store_Name": "Meijer Gas Station 161", "Address": "2145 Sir Barton Way", "Address_Line__2": null, "City": "Lexington", "State": "KY", "Zip5": "40509", "Zip4": "2203", "County": "FAYETTE", "Longitude": -84.418816, "Latitude": 38.020084 
    },
 { 
     "ObjectId": 6, "Store_Name": "New Entry Sustainable Farming Project - Food Hub", "Address": "733 Cabot St", "Address_Line__2": null, "City": "Beverly", "State": "MA", "Zip5": "01915", "Zip4": "1027", "County": "ESSEX", "Longitude": -70.899086, "Latitude": 42.583797 
    }, 
 {
      "ObjectId": 7, "Store_Name": "Mejier Gas Station 308", "Address": "1820 Nagel Rd", "Address_Line__2": null, "City": "Avon", "State": "OH", "Zip5": "44011", "Zip4": "1442", "County": "LORAIN", "Longitude": -81.988991, "Latitude": 41.46114
     }, 
 { 
     "ObjectId": 8, "Store_Name": "Discount Food Mart", "Address": "3208 Martin Luther King Jr Dr SW", "Address_Line__2": null, "City": "Atlanta", "State": "GA", "Zip5": "30311", "Zip4": "1302", "County": "FULTON", "Longitude": -84.492302, "Latitude": 33.752197 
    }, 
{
     "ObjectId": 9, "Store_Name": "Meijer Gas Station 214", "Address": "13705 S Route 59", "Address_Line__2": null, "City": "Plainfield", "State": "IL", "Zip5": "60544", "Zip4": "6106", "County": "WILL", "Longitude": -88.201988, "Latitude": 41.632893
 }, 

    ]
}

function makeUserSavedLocationsArray (users, userSavedLocations) {
  return [
  {
    id: 1,
    ObjectId: Object[0].Id,
    user_id: users[0].id,
    userSavedLocations: userSavedLocations,
    date_created: new Date('2029-01-22T16:28:32.615Z'),
  },
 ]
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('snap_users').insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('snap_users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}

function makeAuthHeader(user) {
  const token = Buffer.from(`${user.user_name}:${user.password}`).toString('base64')
  return `Basic ${token}`
}
 
module.exports = {
    makeUsersArray,
    makeStoresArray,
    makeUserSavedLocationsArray,
    makeAuthHeader,
    seedUsers,
}