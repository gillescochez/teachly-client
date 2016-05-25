/**
 * Toast service used to broadcast message to the user
 * @param $rootScope {Object} angular root scope
 */
services.toasts = function($rootScope) {

	function emit(type, message) {
		$rootScope.$emit("toast", {
			type: type,
			message: message
		});
	}

	return {
		message: function(message) {
			emit("primary", message);
		},
		info: function(message) {
			emit("info", message);
		},
		success: function(message) {
			emit("success", message);
		},
		warning: function(message) {
			emit("warning", message);
		},
		error: function(message) {
			emit("danger", message);
		}
	}
};

services.toasts.$inject = ["$rootScope"];