const pool = require("../utils/pool")

// static method: Order.insert, Number.parseInt, Math.random
// instance method: .map, .toString(), .toUpperCase()
module.exports = class Order {
  id;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.quantity = row.quantity;
  }

  static async insert(value) {
    const { rows } = await pool.query(
      'INSERT INTO orders (quantity) VALUES ($1) RETURNING *',
      [value.quantity]
    )

    return new Order(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM orders (quantity) VALUES ($1) WHERE id = $1 RETURNING *',
      [value.quantity]
    )
    return new Order(row[0]);
  }

  static async getOrders() {
    const { rows } = await pool.query(
      'SELECT * FROM orders RETURNING *',

    )
    return Order(rows);
  }
};
