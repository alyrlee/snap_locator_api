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
        id: snap_app_users.id,
        user_id: snap_app_users.id,
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

module.exports = profileService;