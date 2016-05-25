/**
 * Internationalization service
 * @param constants {Object} constants service
 * @returns {{fetch: fetch}}
 */
services.i18n = function(constants) {

    var main = "en-GB";

    // TODO temporary, we can later detect locale settings and serve the right dictionary
    var current = main;

    return {

        fetch: function(id) {
            return locales[current][id] || locales[main][id] || constants.i18n.not_found + id;
        }
    };
};

services.i18n.$inject = ["constants"];