process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('../app');
let items = require('../fakeDb');

let item = { name: 'testItem', price: 100 };

beforeEach(async () => {
	items.push(item);
});

afterEach(async () => {
	items = [];
});

describe('GET /items', function() {
	test('Gets a list of items', async function() {
		const resp = await request(app).get(`/items`);
		const { items } = resp.body;

		expect(resp.statusCode).toBe(200);
		expect(items).toHaveLength(1);
	});
});

describe('GET /items/:name', function() {
	test('Gets a single item', async function() {
		const resp = await request(app).get(`/items/${item.name}`);

		expect(resp.statusCode).toBe(200);
		expect(resp.body.item).toEqual(item);
	});

	test("Responds with 404 if can't find item", async function() {
		const resp = await request(app).get(`/items/missing`);

		expect(resp.statusCode).toBe(404);
	});
});

describe('POST /items', function() {
	test('Creates a new item', async function() {
		const resp = await request(app).post(`/items`).send({
			name: 'Sock',
			price: 1.0
		});

		expect(resp.statusCode).toBe(200);
		expect(resp.body.item).toHaveProperty('name');
		expect(resp.body.item).toHaveProperty('price');
		expect(resp.body.item.name).toEqual('Sock');
		expect(resp.body.item.price).toEqual(1.0);
	});
});

describe('PATCH /items/:name', function() {
	test('Updates a single item', async function() {
		const resp = await request(app).patch(`/items/${item.name}`).send({
			name: 'Pokemon'
		});

		expect(resp.statusCode).toBe(200);
		expect(resp.body.item).toEqual({ name: 'Pokemon' });
	});

	test("Responds with 404 if can't find item", async function() {
		const resp = await request(app).patch(`/items/0`);
		expect(resp.statusCode).toBe(404);
	});
});

describe('DELETE /items/:name', function() {
	test('Deletes a single a item', async function() {
		const resp = await request(app).delete(`/items/${item.name}`);
		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual({ message: 'Item deleted' });
	});
});
