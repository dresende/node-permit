var Permit = require("../lib/permit");

var permit = Permit("dev", { username: "dev", name: "Developer" });

permit.on("failure", function (username, password) {
	console.log("Someone tried to authenticate using %s:%s", username, password);
});
permit.authenticate("unknown", "password", function (err, user) {
	if (user === false) {
		console.log("user not found");
	}
});
