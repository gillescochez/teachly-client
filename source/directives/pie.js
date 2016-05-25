directives.pie = function() {

    var default_radius = 100;

    return {
        restrict: "A",
        link: function(scope, element, attrs) {

            var r = Raphael(element[0]);
            var radius = parseInt(attrs.radius) || default_radius;

            r.setSize(parseInt(attrs.width) || (radius * 4), parseInt(attrs.height) || (radius * 2));

            attrs.$observe("values", function() {

                var legends;
                var values;

                try {
                    legends = JSON.parse(attrs.legends);
                    values = JSON.parse(attrs.values);
                } catch(e) {}

                if (values) {

                    // remove 0 values to avoid raphael bug
                    values.forEach(function(value, i) {
                        if (value === 0) {
                            values.splice(i, 1);
                            legends.splice(i, 1);
                        }
                    });

                    if (legends) {
                        r.piechart(radius, radius, radius, values, {
                            legend: legends
                        });
                    } else {
                        r.piechart(radius, radius, radius, values);
                    }
                }
            });

        }
    }
};