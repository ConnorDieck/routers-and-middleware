const items = require('./fakeDb');

class Item {
	constructor(name, price) {
		this.name = name;
		this.price = price;

		// Add to DB
		items.push(this);
	}

	static update(name, data) {
		let foundItem = Item.find(name);
		if (foundItem === undefined) {
			throw { message: 'Item not found', status: 404 };
		}
		foundItem.name = data.name;
		foundItem.price = data.price;

		return foundItem;
	}

	static find(name) {
		let foundName = items.find((item) => item.name === name);
		if (foundName === undefined) {
			throw { message: 'Item not found', status: 404 };
		}
		return foundName;
	}

	static delete(name) {
		let foundIndex = items.findIndex((item) => item.name === name);
		if (foundIndex === -1) {
			throw { message: 'Item not found', status: 404 };
		}
		items.splice(foundIndex, 1);
	}
}

module.exports = Item;
