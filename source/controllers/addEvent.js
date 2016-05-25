controllers.addEvent = function($scope, $modalInstance, date) {

	$scope.date = date;

	$scope.data = {
		title: "",
		description: "",
		allDay: false,
		recurring: "",
		start: "",
		end: ""
	};

	$scope.ok = function() {
		$modalInstance.close($scope.data);
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

};

controllers.addEvent.$inject = ["$scope", "$modalInstance", "date"];