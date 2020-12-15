const storeLocationsService = {
    getSnapLocations(knex, ObjectId, Store_Name ) {
        return knex
            .from('snap_locations')
            .select('*') 
            .where(
                {ObjectId: ObjectId},
                {Store_Name: Store_Name})
    }, 
   getSnapLocationsById(knex, ObjectId ) {
        return knex
            .from('snap_locations')
            .select('*')
            .where({ObjectId: ObjectId})
                 .first(); 
  },  
  insertSnapLocations(knex, newSnapLocation) {
         return knex
            .insert(newSnapLocation)
            .into('snap_locations')
            .returning('*')
            .then(rows => {
                return rows[0]
            });
  },         
  deleteSnapLocations(knex,Store_Name){
        return knex ('Store_Name')
            .where('Store_Name', Store_Name)
            .delete();
  },
  updateSnapLocations(knex, Store_Name) {
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
module.exports = storeLocationsService;