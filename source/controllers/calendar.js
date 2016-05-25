controllers.calendar = function($scope, $rootScope, $modal, toasts, events, session, calendar) {

	$scope.events = [];

	$scope.config = {
		height: 450,
		editable: true,
		dayClick: function(date) {

			$modal.open({
				templateUrl: 'partials/modals/addEvent.html',
				controller: 'addEvent',
				resolve: {
					date: function() {
						return date;
					}
				}
			}).result.then(function(data) {

				var year = date.getFullYear();
				var month = date.getMonth();
				var day = date.getDate();

				var startDate = new Date(data.start);
				var startHours = startDate.getHours();
				var startMinutes = startDate.getMinutes();

				var endDate = new Date(data.end);
				var endHours = endDate.getHours();
				var endMinutes = endDate.getMinutes();

				events.add({

					user_id: session.getId(),
					title: data.title,
					start: new Date(year, month, day, startHours, startMinutes),
					end: new Date(year, month, day, endHours, endMinutes),
					allDay: data.allDay

				}).success(function() {

					$scope.events.push([
						{
							title: data.title,
							start: new Date(year, month, day, startHours, startMinutes),
							end: new Date(year, month, day, endHours, endMinutes),
							allDay: data.allDay
						}
					]);

					toasts.success("Event added");

				}).error(function() {
					toasts.error("Failed to add event! Please try again.");
				});


			}, function () {
				// dismissed
			});
		},
		eventClick: function(item) {

			$modal.open({
				templateUrl: 'partials/modals/viewEvent.html',
				controller: 'viewEvent',
				resolve: {
					item: function() {
						return item;
					}
				}
			});
		},
		eventDrop: function() {
			console.log(arguments);
		},
		eventResize: function() {
			console.log(arguments);
		}
	};

	events.getForUser().success(function(items) {
		$scope.events.push(items);
	}).error(console.error);

	calendar.query().success(function(items) {

		var lessonsEvents = [];
		var activitiesEvents = [];

		items.forEach(function(item) {

			if (item.lesson) {
				lessonsEvents.push(item.lesson);
			}

			if (item.activity) {
				activitiesEvents.push(item.activity);
			}

		});

		$scope.events.push(lessonsEvents);
		$scope.events.push(activitiesEvents);


	}).error(console.error);

	$rootScope.$broadcast("breadcrumb:add", {
		label: "Calendar"
	});
};

controllers.calendar.$inject = ["$scope", "$rootScope", "$modal", "toasts", "events", "session", "calendar"];