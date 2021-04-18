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
            .limit(40)
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
}
module.exports = storeLocationsService;