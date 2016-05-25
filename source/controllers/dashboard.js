/**
 * Dashboard controller
 * @param $scope {Object} angular scope object
 * @param $rootScope {Object} angular root scope object
 * @param $injector {Object} $injector service
 */
controllers.dashboard = function($scope, $rootScope, $injector) {

    var section;
    var service;

    var id = $injector.get("session").getId();
    $scope.user_type = $injector.get("session").getUserType();
    $scope.sections = $injector.get("permissions").getAllowedSections();

    // maybe use later just for having an extra fancy stat graph
    delete $scope.sections.answers;
    delete $scope.sections.questions;
    delete $scope.sections.logs;
    delete $scope.sections.activities;
    delete $scope.sections.subjects;
    delete $scope.sections.news;

    $scope.data = {};
    $scope.teachers = [];
    $scope.students = [];
    $scope.lessons = [];

    if ($scope.user_type < 3) {

        for (section in $scope.sections) {

            service = $injector.get(section);

            if (service) {

                (function(serv, sect) {

                    serv.getOverview($scope.user_type == 2 ? id : null).success(function(data) {
                        $scope.data[sect] = data;
                    }).error(function(err) {
                        console.log(err);
                    });

                })(service, section);
            }
        }
    }

    if ($scope.user_type == 1) {

        service = $injector.get("users");

        // TODO don't use raw!
        // TODO create proper API with pagination support
        service.raw("/users/teachers").then(function(res) {
            $scope.teachers = res.data;
        });

        service.raw("/users/students").then(function(res) {
            $scope.students = res.data;
        });
    }

    if ($scope.user_type == 3) {

        service = $injector.get("lessons");

        // TODO don't use raw!
        // TODO create proper API with pagination support
        service.raw("/lessons/student?student_id=" + id).then(function(res) {
            $scope.lessons = res.data;
        });
    }

};

/**
 * Dependencies
 * @type {String[]}
 */
controllers.dashboard.$inject = ["$scope", "$rootScope", "$injector"];