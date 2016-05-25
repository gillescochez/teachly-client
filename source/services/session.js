/**
 * Session service used to store session data
 * @param $cookieStore {Object} angular cookies
 */
services.session = function($cookieStore) {

    var id, username, user_type;
    var cookie = $cookieStore.get("user");

    function create(user) {

        id = user.id;
        username = user.username;
        user_type = user.user_type;

        $cookieStore.put("user", user);
    }

    // TODO for extra security we need to store the password hash and query the backend
    if (cookie) {
        create(cookie);
    }

    return {

        /**
         * id getter
         * @returns {*}
         */
        getId: function() {
            return parseInt(id);
        },

        /**
         * Username getter
         * @returns {string}
         */
        getUsername: function() {
            return username;
        },

        /**
         * User type getter
         * @returns {*}
         */
        getUserType: function() {
            return user_type;
        },

        /**
         * Create a new user session
         * @param user {Object}
         */
        create: create,

        /**
         * Destroy the session
         */
        destroy: function() {

            id = null;
            username = null;
            user_type = null;

            $cookieStore.put("user", null);
        }
    };
};

/**
 * Dependencies
 * @type {String[]}
 */
services.session.$inject = ["$cookieStore"];