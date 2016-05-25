/**
 * Toolbar controller
 * @param $scope {Object}
 * @param $rootScope {Object}
 * @param $location {Object}
 * @param session {Object}
 * @param constants {Object}
 */
controllers.toolbar = function($scope, $rootScope, $location, session, constants) {

	var paths = $location.path().split("/");

	$scope.active = paths[1];

	$scope.isCollapsed = true;

    $scope.id = session.getId() || null;
	$scope.username = session.getUsername() || "";
    $scope.display = false;

    $scope.logout = function() {

        session.destroy();

        $scope.display = false;
        $scope.username = "";
		$scope.sections = [];

        $location.path("/login");
        $rootScope.$broadcast(constants.events.user.logout);
    };

    $rootScope.$on(constants.events.user.login, function() {
        $scope.display = true;
        $scope.username = session.getUsername();
    });
};

/**
 * Dependencies
 * @type {string[]}
 */
controllers.toolbar.$inject = ["$scope", "$rootScope", "$location", "session", "constants"];