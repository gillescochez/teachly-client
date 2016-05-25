(function(mod, name) {

    for (name in directives) {
        if (name !== "abstract") {
            mod.directive(name, directives[name]);
        }
    }

})(angular.module(config.app.name + ".directives", []));