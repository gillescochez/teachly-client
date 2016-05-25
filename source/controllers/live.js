/**
 * Live session controller providing interface for live session based on the user type.
 * Teachers can start and control questions being displayed
 * Students can join and answer displayed questions
 * @param $scope {Object} angular scope
 * @param $routeParams {Object} angular route parameters
 * @param $location {Object} angular location parameters
 * @param session {Object} session service
 * @param toasts {Object} session service
 * @param i18n {Object} i18n service
 * @param lessons {Object} lessons service
 * @param questions {Object} questions service
 * @param answers {Object} answers service
 * @param results {Object} results service
 * @param logs {Object} results service
 */
controllers.live = function($scope, $routeParams, $location, session, toasts, i18n, lessons, questions, answers, results, logs) {

	var roomId;
    var ended = false;

	$scope.signed_up = 0;
	$scope.connected = 0;

	$scope.lesson = {};
	$scope.progress = 0;
	$scope.user_type = null;

	$scope.answers = [];

	$scope.start = {
		label: "Start",
		show: false
	};

	function init(lesson) {

		$scope.user_type = session.getUserType();

		$scope.lesson = lesson;

		io.socket.on("room", function(res) {

			if (res.verb === "addedTo") {
				$scope.connected++;
			}

			if (res.verb === "removedFrom") {
				$scope.connected--;
			}

			$scope.$apply();

		});

        // leave the room if the moving away from the live view
        $scope.$on('$locationChangeStart', confirmAndLeave);

        // Type specific initialisations
		if ($scope.user_type == 2) {
			initTeacher(lesson);
		} else {
			initStudent(lesson);
		}
	}

    function confirmAndLeave() {

        if (roomId && !ended) {

            var response = confirm(i18n.fetch("live_window_close_warning"));

            if (response) {

                if ($scope.user_type == 2) {
                    io.socket.post('/message/end_lesson', {
                        room: roomId
                    });
                }

                io.socket.delete('/room/' + roomId + '/participants', {id: window.me.id});
            }
        }

    }

	function initTeacher(lesson) {

		// Get all the questions
		questions.getForLesson($scope.lesson.id).success(function(items) {

			var next = 0;

            $scope.questions = items;

            io.socket.get("/registrations?lesson_id=" + $scope.lesson.id, function(data) {
                $scope.signed_up = data.length;
                $scope.$apply();
            });

            $scope.end = {
                label: "End lesson",
                show: false,
                handler: function() {
                    lessons.save($scope.lesson.id, {
                        given: "true"
                    }).success(function() {

                        ended = true;

                        // TODO redirect to result page
                        io.socket.post('/message/end_lesson', {
                            room: roomId
                        });

                        logs.store("ending", {
                            lesson_id: lesson.id
                        });

                        $location.path("/results/" + $scope.lesson.id);

                    }).error(function() {
                        toasts.error("Failed to save lesson state")
                    });
                }
            };

			$scope.next = {
				label: "Next question",
				show: false,
				handler: function() {

					$scope.questions[next].active = true;
					$scope.questions[next].answered = 0;

					if ($scope.questions[next-1]) {
						$scope.questions[next-1].active = false;
						$scope.questions[next-1].used = true;
					}

					io.socket.post('/message/question', {
                        room: roomId,
                        question: $scope.questions[next]
                    });

                    logs.store("asking", {
                        lesson_id: lesson.id,
                        question_id: $scope.questions[next].id
                    });

                    answers.getForQuestion($scope.questions[next].id).success(function(items) {
                        $scope.answers = items;
                    }).error(function() {
                        toasts.error("Failed to retrieve answers");
                    });

					next++;

                    if (!$scope.questions[next]) {
                        $scope.next.show = false;
                        $scope.end.show = true;
                    }
				}
			};

            lessons.initialize($scope.lesson.id).success(function(res) {

                logs.store("initializing", {
                    lesson_id: lesson.id
                });

                $scope.start.show = true;
            }).error(function() {
                toasts.error("Lesson initialization failed!");
            });

            // create a room for the lesson session
            io.socket.post("/room", {name: lesson.id}, function(res) {

                // Join the room
                io.socket.post('/room/'+res.id+'/participants', {id: window.me.id}, function() {
                    roomId = res.id;
                    $scope.start.show = true;
                    $scope.$apply();
                });

            });

			$scope.start.handler = function() {
                lessons.start($scope.lesson.id);
                $scope.next.show = true;
                $scope.start.show = false;
			};

		}).error(function() {
			toasts.error("lessons_questions_error");
		});

        io.socket.on("results", function(res) {

            var question;

            if (res.verb === "created") {

                if (res.data.lesson_id == lesson.id) {

                    question = getScopedQuestion(res.data.question_id);

                    if (question) {
                        question.answered++;
                    }
                }
            }

            $scope.$apply();

        });

        io.socket.get("/results", function(res) {});
	}

	function initStudent(lesson) {

		var answered = false;
        var q_id = null;

        $scope.question = "Please wait until the lesson starts.";

		$scope.selectAnswer = function(index) {

			if (answered) {
				toasts.warning("You have already selected an answer!");
			} else {
				$scope.answers[index].selected = true;
				answered = true;

                results.add({
                    lesson_id: lesson.id,
                    question_id: q_id,
                    teacher_id: $scope.lesson.user_id,
                    user_id: session.getId(),
                    user_answer_id: $scope.answers[index].id
                });

                logs.store("answering", {
                    lesson_id: lesson.id,
                    question_id: q_id,
                    answer_id: $scope.answers[index].id
                });
			}
		};

		io.socket.on("room", function(res) {

			if (res.verb === "created") {
				if (res.data.name == lesson.id) {
					io.socket.post('/room/'+res.data.id+'/participants', {id: window.me.id}, function() {
						roomId = res.data.id;
					});
				}
			}

			if (res.verb === "messaged") {

				if (res.data.q) {

					$scope.answers = [];
					answered = false;

					$scope.question = res.data.q.question;
                    q_id = res.data.q.id;

					answers.getForQuestion(q_id).success(function(items) {
						$scope.answers = items;
					}).error(function() {
						toasts.error("Failed to retrieve answers");
					});
				}

                if (res.data.end) {
                    ended = true;
                    $scope.answers = [];
                    $scope.question = "Lesson ended!";

                    $location.path("/results/" + $scope.lesson.id);
                }
			}

			$scope.$apply();

		});

		io.socket.get("/room", {where: {"name": lesson.id}}, function(res) {

			(res || []).forEach(function(room) {
				if (room.name == lesson.id) {
					io.socket.post('/room/'+room.id+'/participants', {id: window.me.id});

                    logs.store("joining", {
                        lesson_id: lesson.id
                    });
				}
			});
		});
	}

    function getScopedQuestion(id) {

        var questions = $scope.questions;
        var length = questions.length;
        var i = 0;

        for (; i < length; i++) {
            if (questions[i].id == id) {
                return questions[i];
            }
        }

        return null;
    }

	lessons.getById($routeParams.id).success(init).error(function() {
		toasts.error(i18n.fetch("lessons_fetch_error"));
	});

};

/**
 * Dependencies
 * @type {string[]}
 */
controllers.live.$inject = ["$scope", "$routeParams", "$location", "session", "toasts", "i18n", "lessons", "questions", "answers", "results", "logs"];