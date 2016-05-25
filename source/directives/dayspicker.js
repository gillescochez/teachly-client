directives.dayspicker = function() {

	var days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
	var ui_loaded;
	var $scope;

	function ui(element, input) {

		var obj = input.value ? JSON.parse(input.value) : {};
		var labels = angular.element(input).parents()[0].getElementsByTagName("label");

		angular.element(labels).remove();

		days.forEach(function(day) {

			var checkbox = document.createElement("input");
			var label = document.createElement("label");

			label.className = "text-capitalize text-center margin-right";

			checkbox.className = "checkbox";
			checkbox.style.margin = "0 auto";
			checkbox.type = "checkbox";
			checkbox.name = "days[]";
			checkbox.value = day;
			checkbox.checked = obj[day];

			angular.element(label).text(day).append(checkbox).on("click", function() {
				updateInput(this, input);
			});

			element.append(label);

		});

		updateCheckboxes(input);

	}

	function updateCheckboxes(input) {

		var labels = angular.element(input).parents()[0].getElementsByTagName("label");
		var obj = input.value ? JSON.parse(input.value) : {};

		angular.forEach(labels, function(label) {
			var checkbox = label.getElementsByTagName("input")[0];
			if (obj[checkbox.value]) {
				checkbox.setAttribute("checked", "checked");
			}
		});
	}

	function updateInput(checkbox, input) {

		var obj = input.value ? JSON.parse(input.value) : {};

		if (!checkbox.type) {
			checkbox = checkbox.getElementsByTagName("input")[0];
		}

		if (checkbox.checked) {
			obj[checkbox.value] = true;
		} else {
			if (obj[checkbox.value]) {
				delete obj[checkbox.value];
			}
		}

		input.value = JSON.stringify(obj);
		$scope.item.days = input.value;
	}

	function unbind(element) {
		var checkboxes = element[0].getElementsByTagName("input");
		angular.forEach(checkboxes, function(checkbox) {
			angular.element(checkbox).off("click");
		});
	}

	return {
		restrict: "AE",
		link: function(scope, element, attrs) {

			var input = element.children()[0];

			$scope = scope;

			scope.$watch("item.days", function(value) {
				input.value = value;
				ui(element, input);
			});

			scope.$on("$destroy", function() {
				unbind(element);
			});

		}
	};

};

directives.dayspicker.$inject = [];