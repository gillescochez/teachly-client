(function(mod, name) {

    for (name in services) {
        if (name !== "abstract") {
            mod.factory(name, services[name]);
        }
    }

})(angular.module(config.app.name + ".services", []));