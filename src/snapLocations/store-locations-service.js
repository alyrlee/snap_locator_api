const storeLocationsService = {
    getSnapLocations(knex, ObjectId, Store_Name ) {
        return knex
            .select('*') 
            .from('snap_locations')
            .where(
                {ObjectId: ObjectId},
                {Store_Name: Store_Name});
    }, 
   getSnapLocationsById(knex, ObjectId ) {
        return knex
            .from('snap_locations')
            .select('*')
            .where(
                {ObjectId: ObjectId},
            )
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
  }
};  

// serializeStores(Store_Name)


module.exports = storeLocationsService;