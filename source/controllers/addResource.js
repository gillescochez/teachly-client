controllers.addResource = function($scope, $modalInstance) {

	$scope.file = "";

	$scope.ok = function () {

		if (!$scope.file) {
			alert("You didn't type any file!");
			return;
		}

		$modalInstance.close($scope.file);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

};

controllers.addResource.$inject = ["$scope", "$modalInstance"];