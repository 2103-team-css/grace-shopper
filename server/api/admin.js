const router = require("express").Router();
const { Product, User } = require("../db");
module.exports = router;

router.get("/users"),
  async (req, res, next) => {
    try {
      const user = await User.findAll();
      res.send(user);
    } catch (err) {
      next(err);
    }
  };
router.post("/products", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
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
    console.log("req.params", req.params);
    console.log("req.body --->", req.body);
    const update = await Product.findByPk(req.params.id);
    console.log("update");
    await update.update({
      code: req.body.code,
      name: req.body.name,
      quantity: Number(req.body.quantity),
      description: req.body.description,
      price: Number(req.body.price),
      category: req.body.category,
      imageUrl: req.body.imageUrl,
    });
    res.send(update);
  } catch (err) {
    next(err);
  }
});

router.put("/users/:id", async (req, res, next) => {
  try {
    const update = await User.findByPk(req.params.id);
    await update.update({
      email: req.body.code,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
      fullName: req.body.fullName,
    });
    res.send(update);
  } catch (err) {
    next(err);
  }
});
