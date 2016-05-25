controllers.main = function() {
	io.socket.on("hello", function(data) {
		window.me = data;
	});
};
controllers.main.$inject = [];