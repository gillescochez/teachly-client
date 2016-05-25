angular
    .module(config.app.name, config.app.modules)
    .config(config.routes)
    .run(config.access);
