const router = require("express").Router();
const { Product, User } = require("../db");
module.exports = router;

router.get("/users", async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.post("/products", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    // product.code = req.body.code;
    // product.name = req.body.name;
    // product.quantity = req.body.quantity;
    // product.description = req.body.description;
    // product.price = req.body.price;
    // product.category = req.body.category;
    // product.imageUrl = req.body.imageUrl;

    // const add = await Product.add(product);
    res.send(newProduct);
  } catch (err) {
    next(err);
  }
});

router.delete("/products/:id", async (req, res, next) => {
  try {
    const destroy = await Product.destroy(req.params.id);
    res.send(destroy);
  } catch (err) {
    next(err);
  }
});

router.put("/products/:id", async (req, res, next) => {
  try {
    const update = await Product.findbyPk(req.params.id);
    await update.update({
      code: req.body.code,
      name: req.body.name,
      quantity: req.body.quantity,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      imageUrl: req.body.imageUrl,
    });
    res.send(update);
  } catch (err) {
    next(err);
  }
});
