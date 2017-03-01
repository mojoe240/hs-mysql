var mysql = require('mysql');

var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

exports.getOfficeMap = (req, res) => {
	res.render('office', {
		title: 'Office Map'
	});
};

exports.getPerson = (req, res, done) => {
  console.log('Getting person', req.params.id);
	connection.query("SELECT * FROM users WHERE seat_id = ?", [req.params.id], (err, rows) => {
		if (err)
			return done(err);
		if (rows.length) {
      console.log(rows[0].first_name)
      res.render('person', {
        title: 'Person',
        firstName: rows[0].first_name,
        lastName: rows[0].last_name,
        seatNumber: rows[0].seat_id,
      });
      // return done(null, rows[0].first_name);
		}
	});
};
