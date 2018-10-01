var bcrypt = require('bcrypt');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('../db');

const saltRounds = 10;

class UserStateManager {
	constructor(expressApp) {
		// setup and configure passport middleware
		passport.use(new Strategy({
				usernameField : 'username',
				passwordField : 'password',
				passReqToCallback : true
			}, function(req, username, password, cb) {
			  	db.users.findByUsername(username, (err, user) => {
					if (err) { return cb(err); }
					if (!user) { return cb(null, false); }
					return bcrypt.compareSync(password, user.passHash) ? cb(null, user) : cb(null, false);
			  	});
			}
		));

		passport.serializeUser((user, cb) => {
			cb(null, user.id);
		});

		passport.deserializeUser((id, cb) => {
			db.users.findById(id, (err, user) => {
			  	if (err) { return cb(err); }
			  	cb(null, user);
			});
		});

		expressApp.use(passport.initialize());
		expressApp.use(passport.session());
	}

	makeSecure(user) {
		var newUser = Object.assign({}, user);
		if (newUser.passHash) {
			delete newUser.passHash;
		}

		return newUser;
	}

	addUser(username, password, email, displayName, cb) {
		var hash = bcrypt.hashSync(password, saltRounds);
		if (hash) {
			db.users.addUser(username, hash, displayName, email, (err, user) => {
				cb(err, user);
			});
		} else {
			return cb(null, false);
		}
	}

	signupHandler(req, res, next) {
		let self = this;
		let { username, password, email, displayName } = req.body;
		let responseObject = { success: false, message: "An error occurred. Please try again later."};

		db.users.findByUsername(username, (err, user) => {
			if (user) { return res.send({ success: false, message: "Username already in use." }); }
			if (err) { return res.send(responseObject); }
			this.addUser(username, password, email, displayName, (err, newUser) => {
				if (newUser) {
					req.logIn(newUser, (loginError) => {
						if (loginError) { return next(loginError); }
						responseObject.success = true;
						responseObject.userState = self.makeSecure(newUser);
						return res.send(responseObject);
				  	});
				} else {
					console.log(err);
					return res.send(responseObject);
				}
			});
		});
	}

	loginHandler(req, res, next) {
		var self = this,
			responseObject = {
				success: false,
				user: null,
				errorMessage: null
			};

		passport.authenticate('local', function(err, user) {
		  	if (err) { return next(err); }
		  	if (!user) {
				responseObject.errorMessage = "username does not exist";
				return res.send(responseObject);
			}
		  	req.logIn(user, function(err) {
				if (err) { return next(err); }
				responseObject.success = true;
				responseObject.user = self.makeSecure(user);
				return res.send(responseObject);
		  	});
		})(req, res, next);
	}

	logoutHandler(req, res, next) {
		req.logout();
		req.session.destroy((err) => {
			if (err) { return next(err); }
			return res.send({ success: true, authenticated: req.isAuthenticated() });
		});
	}
}

exports.UserStateManager = UserStateManager;
