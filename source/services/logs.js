/**
 * Event logs service
 * @param restful {Object} restful service instance
 * @param session {Object} session service instance
 */
services.logs = function(restful, session) {

    var api = services.abstract.api(restful, "logs");

    api.store = function(event, params) {

        var attributes = {
            user_id: session.getId(),
            user_type: session.getUserType(),
            event: event
        };

        angular.extend(attributes, params || {});

        return api.add(attributes);
    };

    return api;

};

/**
 * Dependencies
 * @type {string[]}
 */
services.logs.$inject = ["restful", "session"];