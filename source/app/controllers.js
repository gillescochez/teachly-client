(function(mod, name) {

    for (name in controllers) {

		if (name !== "abstract") {
			mod.controller(name, controllers[name]);
		}
    }

})(angular.module(config.app.name + ".controllers", [config.app.name + ".services"]));