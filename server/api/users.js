const router = require("express").Router();
const { User } = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'fullName'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
