var util = require("util"),
    events = require("events");

module.exports = function (authority, opts) {
	var Auth = authority;

	if (typeof authority == "string") {
		Auth = require("./authorities/" + authority);
	}

	return new Permit(new Auth(opts));
};

function Permit(authority) {
	events.EventEmitter.call(this);

	this._authority = authority;
}
util.inherits(Permit, events.EventEmitter);

Permit.prototype.authenticate = function (username, password, cb) {
	this._authority.authenticate(username, password, (function (permit) {
		return function (err, user) {
			if (err) {
				permit.emit("error", err);
				return cb(err);
			}
			if (user === false) {
				permit.emit("failure", username, password);
			}

			return cb(null, user);
		}
	})(this));

	return this;
};
