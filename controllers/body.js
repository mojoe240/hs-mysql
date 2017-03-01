var mysql = require('mysql');

var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

exports.getOfficeMap = (req, res) => {
	res.render('office', {
		title: 'Office Map'
	});
};
exports.getPersonbyName = (req, res, done) => {
	console.log(req.query.name)
	connection.query("SELECT * FROM users WHERE name = ?", [req.query.name], (err, rows) => {
		if (err)
			return done(err);
		console.log(rows);
		if (rows.length) {
			return res.json(rows);
		}
	});

};

exports.getPerson = (req, res, done) => {
	connection.query("SELECT * FROM users WHERE seat_id = ?", [req.params.id], (err, rows) => {
		if (err)
			return done(err);
		if (rows.length) {
			return res.json(rows);
		}
	});
};

exports.getImage = (req, res, done) => {
	connection.query("SELECT * FROM users WHERE seat_id = ?", [req.params.id], (err, rows) => {
		if (err)
			return done(err);
		if (rows.length) {
			return res.json(rows[0].img);
		}
	});
}

exports.search = (req, res, done) => {
	connection.query('SELECT name from users where name like "%' + req.query.key + '%"',
		(err, rows, fields) => {
			if (err) throw err;
			var data = [];
			for (i = 0; i < rows.length; i++) {
				data.push(rows[i].name);
			}
			res.end(JSON.stringify(data));
		});
}
