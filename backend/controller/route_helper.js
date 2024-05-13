const bcrypt = require('bcrypt');
var path = require('path');

var route_helper = function () {
	return {
		encryptPassword: (password, callback) => {
			// bcrypt.hash(password, 10, function (error, hash) {
			//   return callback(null, hash);
			// });
			bcrypt.hash(password, 10, callback);
		},

		isLoggedIn: (req, obj) => {
			if (typeof obj === 'string' || obj instanceof String) {
				return (
					req.session.username != null && req.session.username == obj
				);
			} else {
				return (
					req.session.user_id != null && req.session.user_id == obj
				);
			}
		},

		isOK: (str) => {
			if (str == null) {
				return false;
			}
			const emojiRegex =
				/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
			// for (var i = 0; i < str.length; i++) {
			//   if (!/[A-Za-z0-9 .\/?,'_\-\#]/.test(str[i])) {
			//     return false;
			//   }
			// }
			// return true;
			// Check if the string contains an emoji
			if (emojiRegex.test(str)) {
				return false;
			} else {
				return true;
			}
		},
	};
};

var encryptPassword = function (password, callback) {
	return route_helper().encryptPassword(password, callback);
};

var isLoggedIn = function (req, obj) {
	return route_helper().isLoggedIn(req, obj);
};

var isOK = function (req) {
	return route_helper().isOK(req);
};

module.exports = {
	encryptPassword,
	isLoggedIn,
	isOK,
};
