module.exports = function(config) {
    
    config.set({
    
        basePath: "../",
        
        files: [
            "app/libs/angular/angular.js",
            "app/libs/angular-cookies/angular-cookies.js",
            "app/libs/angular-route/angular-route.js",
            "app/libs/angular-mocks/angular-mocks.js",
            "app/libs/sails.io.js/dist/sails.io.js",
            "app/libs/raphael/raphael-min.js",
            "app/libs/g.raphael/g.raphael-min.js",
            "app/libs/g.raphael/g.pie-min.js",
            "app/libs/moment/min/moment.min.js",
            "app/libs/angular-moment/angular-moment.min.js",
            "source/namespace.js",
            "source/config/*.js",
            "source/controllers/abstract/*.js",
            "source/controllers/*.js",
            "source/directives/*.js",
            "source/locales/*.js",
            "source/services/abstract/*.js",
            "source/services/*.js",
            "source/app/*.js",
            "test/unit/**/*.js"
        ],
        
        autoWatch: true,
        
        frameworks: ["jasmine"],
        
        browsers: ["Chrome"],
        
        plugins: [
            "karma-chrome-launcher",
            "karma-firefox-launcher",
            "karma-jasmine",
            "karma-junit-reporter"
        ],
        
        junitReporter: {
            outputFile: "test_out/unit.xml",
            suite: "unit"
        }
    
    });
};
