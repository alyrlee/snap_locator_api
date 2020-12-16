const userSavedLocationsService = {
    getUserSavedLocations(knex) {
        return knex
            .from('user_saved_locations')
            .select('*') 
            
    }, 
   getUserSavedLocationsById(knex, id ) {
        return knex
            .from('user_saved_locations')
            .select('*')
            .where({id: id})
                 .first(); 
  },  
  insertUserSavedLocations(knex, saved_location_category) {
         return knex
            .insert(saved_location_category)
            .into('user_saved_locations')
            .returning('*')
            .then(rows => {
                return rows[0]
            });
  }, 
  insertTextUserSavedLocations(knex, text) {
    return knex
       .insert(text)
       .into('user_saved_locations')
       .returning('*')
       .then(rows => {
           return rows[0]
       });
},                 
  deleteUserSavedLocations(knex,Store_Name){
        return knex ('Store_Name')
            .where('Store_Name', Store_Name)
            .delete();
  },
  updateUserSavedLocations(knex, Store_Name) {
        return knex ('Store_Name')
            .where('Store_Name', Store_Name)
            .update();
  },
serializeStores(Store_Name) {
    const { user } = Store_Name
    return {
        id: user_saved_locations.id,
        user_id: user_saved_locations.id,
        text: xss(user_saved_locations.text),
        date_created: new Date(user_saved_locations.date_created),
        user: {
            id: user.id,
            user_name: user.user_name,
            full_name: user.full_name,
            nickname: user.nickname,
            date_created: new Date(user.date_created),
            date_modified: new Date(user.date_modified) || null
        },
     } 
  },
}
module.exports = userSavedLocationsService;