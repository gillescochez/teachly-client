controllers.lesson = function($scope, $rootScope, $routeParams, $modal, lessons, toasts, session, forums, news) {

	$scope.lesson = {};

	$scope.resources = [];
	$scope.forums = [];
	$scope.news = [];

	$scope.addNews = function(id) {
		$modal.open({
			templateUrl: 'partials/modals/resource.html',
			controller: 'addResource'
		}).result.then(function(resource) {
				// success
			}, function () {
				// dismissed
			});
	};

	$scope.addResource = function(id) {
		$modal.open({
			templateUrl: 'partials/modals/resource.html',
			controller: 'addResource'
		}).result.then(function(resource) {
				// success
			}, function () {
				// dismissed
			});
	};

	$scope.canAddResources = session.getUserType() < 3;

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
				lesson_id: $scope.lesson.id,
				message: message,
				author: session.getUsername(),
				reply_id: reply_id || 0
			};

			forums.add(data).success(function() {

				forums.getForLesson($routeParams.id).success(function(items) {
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

	$scope.signUp = function(id) {
		lessons.register({
			lesson_id: id,
			student_id: session.getId()
		}).success(function() {
			$scope.lesson.signed = true;
		}).error(function() {
			toasts.error("Sign up failed!");
		});
	};

	news.getForLesson($routeParams.id).success(function(items) {
		$scope.news = items;
	}).error(console.error);

	forums.getForLesson($routeParams.id).success(function(items) {
		$scope.forums = items;
	}).error(function() {
		toasts.error(i18n.fetch("forums_fetch_error"));
	});

	lessons.single($routeParams.id).success(function(item) {
		$scope.lesson = item;
		$rootScope.$broadcast("breadcrumb:add", {
			label: "Lessons",
			path: "/lessons"
		});
		$rootScope.$broadcast("breadcrumb:add", {
			label: item.title
		});
	}).error(function() {
		toasts.error(i18n.fetch("lessons_fetch_error"));
	});

};

controllers.lesson.$inject = ["$scope", "$rootScope", "$routeParams", "$modal", "lessons", "toasts", "session", "forums", "news"];