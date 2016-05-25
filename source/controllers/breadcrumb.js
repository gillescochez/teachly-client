controllers.breadcrumb = function($scope, $location) {
	var path = $location.path();
	$scope.crumbs = [];

	function update() {

		path = $location.path();
		$scope.crumbs = [];

		if (path !== "/dashboard" && path !== "/login") {
			$scope.crumbs.push({
				label: "Dashboard",
				path: "/dashboard"
			});
		}

		if (path === "/dashboard") {
			$scope.crumbs.push({
				label: "Dashboard"
			});
		}
	}

	update();

	$scope.$on("$locationChangeSuccess", update);

	$scope.$on("breadcrumb:add", function(event, crumb) {
		$scope.crumbs.push(crumb);
	})
};

controllers.breadcrumb.$inject = ["$scope", "$location"];