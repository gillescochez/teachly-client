controllers.forums = function($scope, $rootScope, $modal, forums, toasts, i18n, session) {

	$scope.forums = [];

	$scope.discuss = function(reply_id) {

		$modal.open({
			templateUrl: 'partials/modals/discussion.html',
			controller: 'startDiscussion',
			resolve: {
				reply: function() {
					return !!reply_id;
				}
			}
		}).result.then(function(message) {

				var data = {
					user_id: session.getId(),
					lesson_id: 0,
					message: message,
					author: session.getUsername(),
					reply_id: reply_id || 0
				};

				forums.add(data).success(function() {

					forums.getForLesson(0).success(function(items) {
						$scope.forums = items;
					}).error(function() {
						toasts.error(i18n.fetch("forums_fetch_error"));
					});

				}).error(function() {
					toasts.error("Starting discussion failed!");
				});


			}, function () {
				// dismissed
			});
	};

	forums.getForLesson(0).success(function(items) {
		$scope.forums = items;
	}).error(function() {
		toasts.error(i18n.fetch("forums_fetch_error"));
	});

	$rootScope.$broadcast("breadcrumb:add", {
		label: i18n.fetch("forums")
	});
};

controllers.forums.$inject = ["$scope", "$rootScope", "$modal", "forums", "toasts", "i18n", "session"];