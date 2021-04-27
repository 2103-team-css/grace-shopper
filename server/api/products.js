const router = require("express").Router();
const { Product } = require("../db");
module.exports = router;

//GETS ROUTE FOR ALL PRODUCTS
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({});
    res.json(products);
  } catch (err) {
    next(err);
  }
});

//GET ROUTE FOR SINGLE PRODUCT
router.get("/:id", async (req, res, next) => {
  try {
    const getOneProduct = await Product.findByPk(req.params.id);
    res.json(getOneProduct);
  } catch (err) {
    next(err);
  }
});
