/**
 * Lesson button directive which display various state based on the lesson state
 * @param session {Object} session instance
 * @returns {{restrict: string, link: link}}
 */
directives.lessonButton = function(session) {

    var user_type = session.getUserType();

    var icons = {
        join: "glyphicon-plus",
        live: "glyphicon-play",
        results: "glyphicon-stats",
        started: "glyphicon-ban-circle",
        signed: "glyphicon-ok"
    };

    function cleanse(icon) {

        var key;
        var classes = [];

        for (key in icons) {
            classes.push(icons[key]);
        }

        icon.removeClass(classes.join(" "));
        show(icon);
    }

    function hide(element) {
        element.addClass("ng-hide");
    }

    function show(element) {
        element.removeClass("ng-hide");
    }

    return {

        restrict: "AC",
        link: function(scope, element, attr) {

            var icon = angular.element(element[0].getElementsByClassName("glyphicon"));
            var label = angular.element(element[0].getElementsByClassName("lesson-label"));

            hide(element);

            scope.$watch("item.started", function(value) {
                if (value && (attr.given == false || attr.given == "false")) {
                    label.text("Started");
                    cleanse(icon);
                    icon.addClass(icons.started);
                    element.attr("href", "");
                    show(element);
                    element.off("click");
                }
            }, true);

            scope.$watch("item.signed", function(value) {

                if (value && (attr.given == false || attr.given == "false")) {
                    label.text("Signed up");
                    cleanse(icon);
                    icon.addClass(icons.signed);
                    element.attr("href", "");
                    show(element);
                    element.off("click");
                    element.attr("disabled", true);
                }

            }, true);

            scope.$watch("item.initialized", function(value) {

                if (value && user_type == 3 && (attr.given == false || attr.given == "false")) {
                    label.text("Join");
                    cleanse(icon);
                    icon.addClass(icons.live);
                    element.attr("href", "#/lessons/live/" + attr.index);
                    show(element);
                    element.off("click");
                    element.attr("disabled", false);
                }

            }, true);

            // TODO should not be displayed to student who did not participate
            // In that case simply hide the button
            scope.$watch("item.given", function(value) {
                if ((value == true || value == "true") && (user_type == 2 || (user_type == 3 && (attr.taken == "true" || attr.taken == true)))) {
                    label.text("Results");
                    cleanse(icon);
                    icon.addClass(icons.results);
                    element.attr("href", "#/results/" + attr.index);
                    show(element);
                    element.off("click");
                }
            }, true);

            if ((!attr.given || attr.given == "false") && (!attr.started || attr.started == "false") && (user_type == 3 || user_type == "3") && (attr.signed == "false" || !attr.signed)) {
                label.text("Sign up");
                icon.addClass(icons.join);
                show(element);
                element.on("click", function() {
                    element.off("click");
                    hide(icon);
                    label.text("Signing up");
                    label.addClass("disabled");
                    scope[attr.callback](attr.index);
                });
            }

            if ((!attr.given || attr.given == "false") && user_type == 2 && (attr.published == "true" || attr.published == true)) {
                label.text("Initialize");
                icon.addClass(icons.live);
                element.attr("href", "#/lessons/live/" + attr.index);
                show(element);
                element.off("click");
            }
        }

    }

};

/**
 * Dependencies
 * @type {Array}
 */
directives.lessonButton.$inject = ["session"];