const express = require('express');
const app = express();
const itemRoutes = require('./routes/itemRoutes');
const ExpressError = require('./expressError');

app.use(express.json());
app.use('/items', itemRoutes);

// 404 handler

app.use(function(req, res) {
	return new ExpressError('Not Found', 404);
});

// generic error handler

app.use(function(err, req, res, next) {
	let status = err.status || 500;

	return res.status(status).json({
		error: {
			message: err.message,
			status: status
		}
	});
});

module.exports = app;
