var Permit = require("../lib/permit");

var permit = Permit("dev", { username: "dev", name: "Developer" });

permit.authenticate("dev", "password", function (err, user) {
	console.log(user);
});
permit.authenticate("unknown", "password", function (err, user) {
	if (user === false) {
		console.log("user not found");
	}
});
