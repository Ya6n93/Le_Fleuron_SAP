const app = require('express')();
const config = require('./config');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

mongoose.connect(config.uri.mongodb, { useNewUrlParser: true }, (err) => {
	if (err) console.error(err);
});
mongoose.set('useCreateIndex', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Auth-Token, X-Requested-With');
	res.setHeader('Access-Control-Expose-Headers', 'Auth-Token');
	jwt.verify(req.headers['auth-token'], config.session.secret, (err, decoded) => {
		if (err) {
			req.session = false;
		} else {
			res.setHeader('Auth-Token', req.headers['auth-token']);
			res.setHeader('Auth-Permissions', decoded.session.permissions);
			req.session = decoded.session;
		}
		next();
	});
});

app.use('/', require('./app/routes'));

app.listen(config.server.port, () => {
	console.log('APP STARTED ON PORT ' + config.server.port)
});