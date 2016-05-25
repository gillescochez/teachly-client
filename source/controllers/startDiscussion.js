controllers.startDiscussion = function($scope, $modalInstance, reply) {

	$scope.message = "";
	$scope.reply = reply;

	$scope.update = function(message) {
		$scope.message = message;
	};

	$scope.ok = function () {

		if (!$scope.message) {
			alert("You didn't type any message!");
			return;
		}

		$modalInstance.close($scope.message);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

};

controllers.startDiscussion.$inject = ["$scope", "$modalInstance", "reply"];