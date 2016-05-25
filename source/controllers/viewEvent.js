controllers.viewEvent = function($scope, $modalInstance, item) {

	$scope.item = item;

	$scope.ok = function() {
		$modalInstance.close();
	};

};

controllers.viewEvent.$inject = ["$scope", "$modalInstance", "item"];