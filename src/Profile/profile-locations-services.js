const xss = require('xss');

const profileService = {
    getAllUserProfiles(knex) {
        return knex
            .from('snap_app_users')
            .select('*') 
    }, 
    getUserSavedLocations(knex, user_saved_locations) {
        return knex
        .from('user_saved_locations')
        .select('*')
            .where({user_saved_locations: user_saved_locations})
    },

serializeUserProfile(user_name) {
    const { user } = user_name
    return {
        // id: user.id,
        // text: xss(user_saved_locations.text),
        // date_created: new Date(user_saved_locations.date_created),
        user: {
                id: user_name.id,
                full_name: xss(user_name.full_name),
                user_name: xss(user_name.user_name),
                text: xss(user_name.text),
                date_created: new Date(user_name.date_created),
                date_modified: new Date(user_name.date_modified) || null
        },
     } 
  },
}

module.exports = profileService;