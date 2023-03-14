const { register, login } = require("../controllers/authController");

const router = require("express").Router();
// Register User
router.post('/register', register)
// Login User
router.post('/login', login)

module.exports = router;