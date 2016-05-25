services.forums = function(restful) {
	return angular.extend(services.abstract.api(restful, "forum"), {

		getForLesson: function(lesson_id) {

			return restful.query("/forum", {
				lesson_id: lesson_id
			});
		}
	});
};

services.forums.$inject = ["restful"];