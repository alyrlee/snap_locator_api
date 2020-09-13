const xss = require('xss');

const storeLocationsService = {
    getAllStores(db) {
        return db 
        .from(SNAP_Store_Locations.csv)
        .select ( 
        'id',
        'Store_Name',
        'Address',
        'Address_Line__2', 
        'City',
        'Zip 5',
        'Zip 4',
        'County',
        'Longitude',
        'Latitude'
        ),  
    }
}

module.exports = storeLocationsService;