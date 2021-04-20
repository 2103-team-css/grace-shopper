const router = require("express").Router();
const { Product } = require("../db");
module.exports = router;

const isLoggedIn = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(401).send({ msg: "Not an admin, sorry" });
    }
  } catch (err) {
    next(err);
  }
};

router.post("/admin/products", isloggedin, isAdmin, async (req, res, next) => {
  try {
    const product = new Product();
    product.code = req.body.code;
    product.name = req.body.name;
    product.quantity = req.body.quantity;
    product.description = req.body.description;
    product.price = req.body.price;
    product.category = req.body.category;
    product.imageUrl = req.body.imageUrl;

    const add = await Product.add(product);
    res.send(add);
  } catch (err) {
    next(err);
  }
});

router.delete(
  "/admin/products/:id",
  isloggedin,
  isAdmin,
  async (req, res, next) => {
    try {
      const destroy = await Product.destroy(req.params.id);
      res.send(destroy);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/admin/products/:id",
  isloggedin,
  isAdmin,
  async (req, res, next) => {
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
  }
);
