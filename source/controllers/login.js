/**
 * login controller
 * @param $scope {Object} angular scope
 * @param $rootScope {Object} angular root scope
 * @param $location {Object} angular location
 * @param users {Object} login service
 * @param session {Object} session service
 * @param constants {Object} constants service
 */
controllers.login = function($scope, $rootScope, $location, users, session, constants) {

    /**
     * Username
     * @type {string}
     */
    $scope.username = "";

    /**
     * Password
     * @type {string}
     */
    $scope.password = "";

    /**
     * Track fields with errors
     * @type {{username: boolean, password: boolean}}
     */
    $scope.errors = {
        username: false,
        password: false
    };

    /**
     * Login for submission handler
     */
    $scope.submit = function() {

        users
            .login($scope.username, $scope.password)
            .success(function(user) {

                $scope.errors.username = false;
                $scope.errors.password = false;

                session.create(user);

                $rootScope.$broadcast(constants.events.user.login);

                $location.path("/dashboard");
            })
            .error(function(response) {

                if (response.error === "PASSWORD") {
                    $scope.errors.username = false;
                    $scope.errors.password = true;
                }

                if (response.error === "NOT_FOUND") {
                    $scope.errors.username = true;
                    $scope.errors.password = true;
                }

            });

    };

};

/**
 * Dependencies
 * @type {string[]}
 */
controllers.login.$inject = ["$scope", "$rootScope", "$location", "users", "session", "constants"];