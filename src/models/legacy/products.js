const db = require("../config/database");

async function insertProduct(product) {
  const { name, category, price } = product;

  try {
    await db.query(
      `
        INSERT INTO products (name, category, price)
        VALUES ($1, $2, $3)`,
      [name, category, price]
    );
  } catch (error) {
    throw new Error("Erro ao criar produto");
  }
}

async function getAllProducts() {
  try {
    const products = await db.query("SELECT * FROM products");

    return products.rows;
  } catch (error) {
    throw new Error("Erro ao buscar produtos");
  }
}

module.exports = {
  insertProduct,
  getAllProducts,
};
