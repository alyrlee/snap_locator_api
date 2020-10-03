const storeLocationsService = {
    getAllStores(knex, db) {
        return knex, db 
        .from('snap_locations')
        .select ( 
        'ObjectId',
        'Store_Name',
        'Address',
        'Address_Line__2', 
        'City',
        'Zip 5',
        'Zip 4',
        'County',
        'Longitude',
        'Latitude'
        ) 
    }, 
  insertStoreLocations(db, newStore) {
      return db
      .insert(newStore)
      .into('Store_Name')
      .returning('*')
      .then(([Store_Name]) => Store_Name)
      .then(Store_Name => storeLocationsService.getByObjectId(db, ObjectId))
  },  
  
  deleteStoreLocations(db, ObjectId){
      return db('Store_Name')
      .where('ObjectId', ObjectId)
      .delete()
  },

// serializeStores(Store_Name)


module.exports = storeLocationsService;