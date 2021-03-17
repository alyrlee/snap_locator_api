const storeLocationsService = {
    getSnapLocations(knex) {
        return knex
            .select('*')    
            .from('snap_locations') 
    }, 
    getSnapCityState(knex, city, state) {
    return knex
            .select('*')    
            .from('snap_locations') 
            .where({city: city})
            .where({state: state})
    }, 
    getSnapLocationsByName(knex, Store_Name ) {
        return knex
            .select('*')    
            .from('snap_locations')
            .where({Store_Name: Store_Name})
  },     
   getSnapLocationsById(knex, ObjectId ) {
        return knex
            .select('*')    
            .from('snap_locations')
            .where({ObjectId: ObjectId})
                 .first(); 
  },     
  deleteSnapLocations(knex,Store_Name){
        return knex ('Store_Name')
            .where('Store_Name', Store_Name)
            .delete();
  },
//   updateSnapLocations(knex, Store_Name) {
//         return knex ('Store_Name')
//             .where('Store_Name', Store_Name)
//             .update();
//   },
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
module.exports = storeLocationsService;