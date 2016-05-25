services.resources = function(restful) {
	return angular.extend(services.abstract.api(restful, "resource"), {

		getForLesson: function(lesson_id) {

			return restful.query("/resource", {
				lesson_id: lesson_id
			});
		}
	});
};

services.resources.$inject = ["restful"];