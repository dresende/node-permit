var orm = require("orm");

module.exports = Authority;

function Authority(opts) {
	var connected = false, User;

	orm.connect(opts.uri || "mysql://root@localhost/mysql", function (success, db) {
		if (!success) return;

		connected = true;

		var modelProperties = {
			username: String,
			password: String
		};
		if (opts.properties) {
			for (k in opts.properties) {
				modelProperties[k] = opts.properties[k];
			}
		}

		User = db.define(opts.model || "user", modelProperties);
	});

	return {
		authenticate: function (username, password, cb) {
			if (!connected) {
				return cb(new Error("Not connected to user database"), false);
			}

			User.find({ username: username, password: password }, function (users) {
				if (!users) {
					return cb(null, false);
				}

				return cb(null, users[0]);
			});
		}
	};
}
