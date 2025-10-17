const express = require("express");
const app = express();
const productsRoutes = require("./src/routes/products");

app.use(express.json());

const PORT = 4467;

// Rota - Endpoint - callback function
app.get("/", (req, res) => {
  res.send("Olá Bruno, what's up");
});

app.use(productsRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
