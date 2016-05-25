/**
 * Results service
 * @param restful {Object} restful service instance
 */
services.results = function(restful) {
    return angular.extend(services.abstract.api(restful, "results"), {

        getForLesson: function(lesson_id) {

            return restful.query("/results", {
                lesson_id: lesson_id
            });
        },

        getForStudent: function(lesson_id, user_id) {

            return restful.query("/results", {
                lesson_id: lesson_id,
                user_id: user_id
            });
        }
    });
};

/**
 * Dependencies
 * @type {string[]}
 */
services.results.$inject = ["restful"];