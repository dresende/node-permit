module.exports = Authority;

function Authority(opts) {
	return {
		authenticate: function (username, password, cb) {
			if (username != opts.username) {
				return cb(null, false);
			}

			return cb(null, opts);
		}
	};
}
