const { updateUser, deleteUser, getUserById, addStock } = require("../controllers/userController");

const router = require("express").Router();

//Update User
router.put('/:id',updateUser)
//Delete User
router.delete('/:id',deleteUser)
//Get User By Id
router.get('/:id',getUserById)
//Add Stock to User
router.put('/stocks/:id',addStock)

module.exports = router;