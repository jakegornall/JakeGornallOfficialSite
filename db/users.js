// start with a fake user for testing purposes
var records = [{
	id: 1,
  username: 'jgornall',
	displayName: 'Jake Gornall',

	// password = test123
  passHash: '$2b$10$RxNPSJw7PRlxqMd0dDo55.x4EIXAYwrj8A9A3NKuRh317J232vH92',
	emails: [ { value: 'jakegornall@yahoo.com' } ]
}];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.addUser = function(username, passHash, displayName, email, cb) {
	process.nextTick(() => {
		let newUser = {
			id: records.length + 1,
			username: username,
			displayName: displayName,
			passHash: passHash,
			emails: [
				{ value: email }
			]
		}

		records.push(newUser);
		return cb(null, newUser);
	})
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}
