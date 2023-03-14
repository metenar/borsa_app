const User = require('../models/user')
const bcrypt = require ('bcryptjs')
const {createError} = require('../utils/error')
const  jwt = require ('jsonwebtoken')

exports.register = async(req,res,next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) return next(createError(409, "User already exists"));
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        const newUser= new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        await newUser.save();
        const {password,isAdmin,...otherDetails}=newUser._doc
        res.status(201).json({...otherDetails});
    } catch (error) {
        next(error);
    }
}
exports.login = async(req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));
    const checkedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkedPassword) return next(createError(400, "Wrong credentials"));
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    res.cookie("access_token",token,{
      httpOnly: true,
    })
    res.status(200).json(otherDetails);
  } catch (error) {
    next(error);
  }
}