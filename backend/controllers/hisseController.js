const Hisse = require("../models/hisse");

exports.createHisse=async(req,res,next) => {
    const newHisse= new Hisse(req.body)
    try {
        const savedHisse=await newHisse.save();
        res.status(200).json(savedHisse)
    } catch (error) {
        next(error);
    }
}
exports.addAlimlar=async(req,res,next) => {
    try {
        const updatedHisse=await Hisse.findOne({code:req.params.code.toUpperCase()})
        updatedHisse.alimlar.push(req.body)
        if (req.body.price*200<updatedHisse.katsayi){
            updatedHisse.katsayi=req.body.price*200
        }
        const savedHisse=await updatedHisse.save()
        res.status(200).json(savedHisse)
   } catch (error) {
       next(error)
   }
}
exports.addSatislar=async(req,res,next) => {
    try {
        const updatedHisse=await Hisse.findOne({code:req.params.code.toUpperCase()})
        updatedHisse.satislar.push(req.body)
        const savedHisse=await updatedHisse.save()
        res.status(200).json(savedHisse)
   } catch (error) {
       next(error)
   }
}
exports.addBedelliBedelsiz=async(req,res,next) => {
    try {
        const updatedHisse=await Hisse.findOne({code:req.params.code.toUpperCase()})
        updatedHisse.bedelli_bedellsiz.push(req.body)
        const savedHisse=await updatedHisse.save()
        res.status(200).json(savedHisse)
   } catch (error) {
       next(error)
   }
}
exports.deleteAlimlar=async(req,res,next) => {
    try {
        await Hisse.updateOne(
            {"alimlar._id":req.params.id},
            {$pull:{alimlar:{_id:req.params.id}}}
            )
        res.status(200).json("Alis silindi")
    } catch (error) {
        next(error)
    }
}
exports.deleteSatislar=async(req,res,next) => {
    try {
        await Hisse.updateOne(
            {"satislar._id":req.params.id},
            {$pull:{satislar:{_id:req.params.id}}}
            )
        res.status(200).json("Satis silindi")
    } catch (error) {
        next(error)
    }
}
exports.deleteBedelli=async(req,res,next) => {
    try {
        await Hisse.updateOne(
            {"bedelli_bedellsiz._id":req.params.id},
            {$pull:{bedelli_bedellsiz:{_id:req.params.id}}}
            )
        res.status(200).json("bedelli/bedelsiz islemi silindi")
    } catch (error) {
        next(error)
    }
}
exports.findHisse=async(req,res,next) => {
    try {
        const hisse=await Hisse.findOne({code:req.params.code.toUpperCase()})
        res.status(200).json(hisse)       
    } catch (error) {
        next(error)
    }  
}
exports.updateAlimlar=async(req,res,next) => {
    try {
        await Hisse.updateOne(
            {"alimlar._id":req.params.id},
            { $set:{"alimlar.$":req.body}},
            { new: true })
        const hisse=await Hisse.findOne({code:req.params.code.toUpperCase()})
        res.status(200).json(hisse)       
    } catch (error) {
        next(error)
    }
}
exports.updateSatislar=async(req,res,next) => {
    try {
        await Hisse.updateOne(
            {"satislar._id":req.params.id},
            { $set:{"satislar.$":req.body}},
            { new: true })
        const hisse=await Hisse.findOne({code:req.params.code.toUpperCase()})
        res.status(200).json(hisse)       
    } catch (error) {
        next(error)
    }
}
exports.updateBedelli=async(req,res,next) => {
    try {
        await Hisse.updateOne(
            {"bedelli_bedellsiz._id":req.params.id},
            { $set:{"bedelli_bedellsiz.$":req.body}},
            { new: true })
        const hisse=await Hisse.findOne({code:req.params.code.toUpperCase()})
        res.status(200).json(hisse)       
    } catch (error) {
        next(error)
    }
}
exports.findAllHisse=async(req,res,next) => {
    try {    
        const hisses = await Hisse.find();
        res.status(200).json(hisses);
    } catch (error) {
      next(error);
    }
}
exports.getalimlarTotal=async(req,res,next) => {
    try {            
        const totals=await Hisse.aggregate([
            {
              "$project": {
                  "code":"$code",
                  "katsayi":"$katsayi",
                "alimlarTotal": { "$sum": "$alimlar.adet"},
                "bedelTotal": { "$sum": "$bedelli_bedellsiz.adet" }
              }
            }
         ])
        res.status(200).json(totals);
    } catch (error) {
      next(error)
    }
}
exports.getsatislarTotal=async(req,res,next) => {
    try {            
        const totals=await Hisse.aggregate([
            {
              "$project": {
                  "code":"$code",
                "satislarTotal": { "$sum": "$satislar.adet"}
              }
            }
         ])
        res.status(200).json(totals);
    } catch (error) {
      next(error)
    }
}
exports.getTotalHarcama=async(req,res,next) => {
    try {    
        const hisses = await Hisse.find();
        let totalHarcama=0;
        hisses.forEach((item)=>{
            item.alimlar.forEach((alim)=>{
                totalHarcama+=alim.adet*alim.price
            })
        })
        res.status(200).json(totalHarcama.toFixed(2));
    } catch (error) {
      next(error)
    }
}
