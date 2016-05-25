config.app = (function() {

    /**
     * Enable/Disable local mode (use local server)
     * @type {boolean}
     */
    var local = window.location.href.indexOf("localhost") !== -1;

	/**
	 * Application internal name
	 * @type {string}
	 */
	var name = "teachly";

	/**
	 * Application module dependencies
	 * @type {*[]}
	 */
	var modules = [
		"ngRoute",
		"ngCookies",
		"ui.calendar",
		"ui.bootstrap",
		name + ".controllers",
		name + ".directives",
		name + ".services"
	];

	/**
	 * Back end server configuration for restful and web socket connection
	 * @type {{protocol: string, domain: string, port: string}}
	 */
	var server = {
		protocol: "http",
		domain: "teachly-server.hushly.co.uk",
		port: "80"
	};

    if (local) {
        server.domain = "localhost";
        server.port = "1337";
    }

	/**
	 * Public API
	 */
	return {
		name: name,
		server: server,
		modules: modules,
		getServerUrl: function() {
			return (server.protocol ? server.protocol : "http") + "://" + server.domain + (server.port ? ":" + server.port : "")
		}
	};

})();