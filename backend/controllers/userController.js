const User=require('../models/user')

exports.getUserById=async (req,res,next)=>{
    try {
        const user = await User.findById(
          req.params.id
        );
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}

exports.updateUser=async (req,res,next)=>{
    try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error)
    }
}
exports.deleteUser=async(req, res, next) =>{
    try {
        await User.findByIdAndDelete(
          req.params.id
        );
        res.status(200).json("The user has been deleted successfully");
    } catch (error) {
        next(error)
    }
}
exports.addStock=async(req, res, next) =>{
    try {
        const user=await User.findById(req.params.id)
        user.stocks.push(req.body)
        const savedUser=await user.save()
        res.status(200).json(savedUser)
   } catch (error) {
       next(error)
   }
}
exports.updateStock=async (req, res, next) =>{
    try {
        await User.updateOne(
            {"stocks._id":req.params.id},
            { $set:{"stocks.$":req.body}},
            { new: true })
        const user=await User.findById(req.params.UserId)
        res.status(200).json(hisse)       
    } catch (error) {
        next(error)
    }
}
exports.deleteStock=async (req, res, next) =>{
    try {
        await User.updateOne(
            {"stocks._id":req.params.id},
            {$pull:{stocks:{_id:req.params.id}}}
            )
        res.status(200).json("Stock silindi.")
    } catch (error) {
        next(error)
    }
}