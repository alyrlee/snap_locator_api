const xss = require('xss');

const ProfileService = {
    getAllUserProfiles(knex) {
        return knex
            .from('snap_app_users')
            .select('*') 
    }, 
   getProfileId(knex, user_id ) {
        return knex
        .from('snap_app_users')            
        .select('*')
            .where({user_id: user_id})
                 .first(); 
  },  
  insertSnapLocations(knex, newUser) {
         return knex
            .insert(newUser)
            .from('snap_app_users')
            .returning('*')
            .then(rows => {
                return rows[0]
            });
  },         
  deleteUserName(knex,user_name){
        return knex ('user_name')
            .where('user_name', user_name)
            .delete();
  },
  updateUserName(knex, user_name) {
        return knex ('user_name')
            .where('user_name', user_name)
            .update();
  },
serializeUserProfile(user_name) {
    const { user } = user_name
    return {
        user_id: xss(user_id),
        user_name: xss(user_name),
        date_created: new Date(snap_app_users.date_created),
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