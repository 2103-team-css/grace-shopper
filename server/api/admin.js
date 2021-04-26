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
    res.send(newProduct);
  } catch (err) {
    next(err);
  }
});

router.put("/products/:id", async (req, res, next) => {
  try {
    const update = await Product.findByPk(req.params.id);
    await update.update(req.body);
    res.send(update);
  } catch (err) {
    next(err);
  }
});

router.put("/users/:id", async (req, res, next) => {
  try {
    const update = await User.findByPk(req.params.id);
    await update.update(req.body);
    res.send(update);
  } catch (err) {
    next(err);
  }
});

router.delete("/users/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.send(user);
  } catch (error) {
    next(error);
  }
});
router.delete("/products/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.send(product);
  } catch (err) {
    next(err);
  }
});
