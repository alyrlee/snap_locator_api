const storeLocationsService = {
    getAllStores(knex, ObjectId, Store_Name ) {
        return knex
            .select('*') 
            .from('snap_locations')
            .where(
                {ObjectId: ObjectId},
                {Store_Name: Store_Name});
    }, 
   getStoresById(knex, ObjectId ) {
        return knex
            .from('snap_locations')
            .select('*')
            .where(
                {ObjectId: ObjectId},
            )
                 .first(); 
  },  
  insertStoreLocations(knex, newStore) {
         return knex
            .insert(newStore)
            .into('snap_locations')
            .returning('*')
            .then(rows => {
                return rows[0]
            });
  },         
  deleteStoreLocations(knex, ObjectId){
        return knex ('Store_Name')
            .where('ObjectId', ObjectId)
            .delete();
  },
  updateStoreLocations(knex, ObjectId,) {
        return knex ('Store_Name')
            .where('ObjectId', ObjectId)
            .update();
  }
};  

// serializeStores(Store_Name)


module.exports = storeLocationsService;