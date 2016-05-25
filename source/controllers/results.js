/**
 * Results controller
 * @param $scope {Object} Angular scope
 * @param $routeParams {Object} Angular route parameters
 * @param lessons {Object} Lessons service
 * @param questions {Object} Questions service
 * @param answers {Object} Answers service
 * @param results {Object} Results service
 * @param toasts {Object} Toasts service
 * @param i18n {Object} Internationalization service
 * @param session {Object} Session service
 */
controllers.results = function($scope, $routeParams, lessons, questions, answers, results, toasts, i18n, session) {

    var user_type = session.getUserType();
    var lesson_id = $routeParams.lesson_id;

    $scope.isHidden = true;

    $scope.isTeacher = user_type === "2";
    $scope.isStudent = user_type === "3";

    $scope.results = [];
    $scope.answers = {};
    $scope.lesson = {};

    $scope.user_score = 0;

    var user_answers = {};

    function getUserAnswerId(question_id) {

        var length = $scope.results.length;
        var i = 0;

        for (; i < length; i++) {
            if (parseInt($scope.results[i].question_id) === parseInt(question_id)) {
                return $scope.results[i].user_answer_id;
            }
        }
    }

    $scope.getAnswer = function(question_id) {

        if (user_answers[question_id]) {
            return user_answers[question_id];
        }

        var as = $scope.answers[question_id];

        if (!as) {
            return;
        }

        var user_answer_id = getUserAnswerId(question_id);
        var length = as.length;
        var  i = 0;

        for (; i < length; i++) {
            if (parseInt(as[i].id) === parseInt(user_answer_id)) {

                if (as[i].is_valid === "true") {
                    $scope.user_score++;
                }

                user_answers[question_id] = as[i];

                return as[i];
            }
        }

        return "";
    };

    lessons.getById(lesson_id).success(function(lesson) {

        $scope.lesson = lesson;

        questions.getForLesson(lesson.id).success(function(qs) {

            var count = qs.length;

            $scope.questions = qs;

            qs.forEach(function(q) {

                answers.getForQuestion(q.id).success(function(a) {

                    $scope.answers[q.id] = a;

                    if (a.is_valid) {
                        $scope.user_score++;
                    }

                    count--;

                    if (count === 0) {

                        $scope.isHidden = true;

                        init();
                    }

                }).error(function() {
                    toasts.error(i18n.fetch("answers_fetch_error"));
                });
            });

        }).error(function() {
            toasts.error(i18n.fetch("questions_fetch_error"));
        });

    }).error(function() {
        toasts.error(i18n.fetch("lessons_fetch_error"));
    });

    function init() {

        if ($scope.isTeacher) {

            results.getForLesson(lesson_id).success(function(data) {

                $scope.results = data;

                $scope.questions.forEach(function(q) {

                    $scope.results.forEach(function(r) {

                        if (parseInt(r.question_id) === parseInt(q.id)) {

                            if (!q.participants) {
                                q.participants = 0;
                                q.valids = 0;
                            }

                            q.participants++;

                            var as = $scope.answers[q.id];

                            as.forEach(function(a) {
                                if (parseInt(r.user_answer_id) === parseInt(a.id)) {
                                    q.valids++;
                                }
                            });
                        }
                    });

                });

            }).error(function() {
                toasts.error(i18n.fetch("results_fetch_error"));
            });

        } else {

            results.getForStudent(lesson_id, session.getId()).success(function(data) {
                $scope.results = data;
            }).error(function() {
                toasts.error(i18n.fetch("results_fetch_error"));
            });
        }
    }
};

/**
 * Dependencies
 * @type {Array}
 */
controllers.results.$inject = ["$scope", "$routeParams", "lessons", "questions", "answers", "results", "toasts", "i18n", "session"];