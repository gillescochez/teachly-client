/**
 * Return the action requested based on the path
 * @param path
 * @returns {string}
 */
controllers.abstract.getAction = function(path) {

	var available = ["edit", "remove", "view", "create", "join", "start"];
	var length = available.length;
	var i = 0;

	for (;i < length; i++) {

		if (path.indexOf(available[i]) !== -1) {
			return available[i];
		}
	}

};