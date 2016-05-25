/**
 *
 * @param $rootScope
 * @param $location
 * @param session
 * @param constants
 */
config.access = function($rootScope, $location, session, constants) {

	$rootScope.$on("$locationChangeStart", function(event, next) {

		var user_type = session.getUserType();
		var next_user_type = next.data ? next.data.user_type : null;

		if (!user_type) {
			$location.path("/login");
		} else {

			if ($location.path() === "/login" && !next_user_type) {
				$location.path("/dashboard");
			} else {
				if (next_user_type && user_type !== next_user_type) {
					$location.path("/dashboard");
					$rootScope.$broadcast(constants.events.access.forbidden);
				}
			}
		}
	});
};

/**
 * Dependencies
 * @type {string[]}
 */
config.access.$inject = ["$rootScope", "$location", "session", "constants"];