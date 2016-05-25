/**
 *
 * @param $scope
 * @param $rootScope
 * @param $timeout
 */
controllers.toasts = function($scope, $rootScope, $timeout) {

	var delay = 3500;
	var anim = 1000;

	$scope.items = [];

	$scope.close = function(index) {

		$timeout.cancel($scope.items[index].timeout);

		$scope.items[index].enable = false;

		$timeout(function() {
			$scope.items.splice(index, 1);
		}, anim);
	};

	$rootScope.$on("toast", function(event, toast) {

		$scope.items.push(toast);

		toast.enable = true;

		$timeout(function() {
            toast.enable = false;
            $timeout(function() {
                $scope.items.forEach(function(item, index) {
                    if (item === toast) {
                        $scope.items.splice(index, 1);
                    }
                });
            }, anim);
        }, delay);
	});
};

/**
 * Dependencies
 * @type {string[]}
 */
controllers.toasts.$inject = ["$scope", "$rootScope", "$timeout"];