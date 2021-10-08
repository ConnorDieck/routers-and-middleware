const express = require('express');
const router = new express.Router();

const items = require('../fakeDb');
const Item = require('../item');

/** GET /items: get list of items */

router.get('/', function(req, res, next) {
	try {
		return res.json({ items: items });
	} catch (err) {
		return next(err);
	}
});

/** POST /items: get list of items */

router.post('/', function(req, res, next) {
	try {
		let newItem = new Item(req.body.name, req.body.price);
		return res.json({ item: newItem });
	} catch (err) {
		return next(err);
	}
});

/** GET /items/:name: get item's name and price */

router.get('/:name', function(req, res, next) {
	try {
		console.log(req);
		let foundItem = Item.find(req.params.name);
		return res.json({ item: foundItem });
	} catch (err) {
		return next(err);
	}
});

/** PATCH /items/:name: update item's name and price */

router.patch('/:name', function(req, res, next) {
	try {
		let foundItem = Item.update(req.params.name, req.body);
		return res.json({ item: foundItem });
	} catch (err) {
		return next(err);
	}
});

/** DELETE /items/[id]: delete item, return status */

router.delete('/:name', function(req, res, next) {
	try {
		Item.delete(req.params.name);
		return res.json({ message: 'Item deleted' });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
