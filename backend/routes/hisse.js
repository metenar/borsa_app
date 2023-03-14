const router = require("express").Router();
const {
  createHisse,
  addAlimlar,
  addSatislar,
  addBedelliBedelsiz,
  deleteAlimlar,
  deleteSatislar,
  deleteBedelli,
  findHisse,
  updateAlimlar,
  updateSatislar,
  updateBedelli,
  findAllHisse,
  getalimlarTotal,
  getsatislarTotal,
  getTotalHarcama,
} = require("../controllers/hisseController");

// Create hisse

router.post("/",createHisse)

// Add alimlar

router.put("/alimlar/:code", addAlimlar)

// Add satislar

router.put("/satislar/:code", addSatislar)

// Add Bedelli_bedelsiz

router.put("/bedel/:code", addBedelliBedelsiz)

// Delete alimlar

router.delete("/alimlar/:id", deleteAlimlar)

// Delete Satislar

router.delete("/satislar/:id", deleteSatislar)

// Delete bedelli

router.delete("/bedel/:id", deleteBedelli)

// Find Hisse

router.get("/find/:code", findHisse)

// update by id alimlar

router.put("/update/:code/alimlar/:id", updateAlimlar)

// update by id satislar

router.put("/update/:code/satislar/:id", updateSatislar)

// update by id bedelli

router.put("/update/:code/bedel/:id", updateBedelli)

// Find All Hisse

router.get("/", findAllHisse);

// Get Total of Alimlar

router.get("/alimlar/total", getalimlarTotal);

// Get Total of Satislar

router.get("/satislar/total", getsatislarTotal);  

// get total harcama
router.get("/harcama", getTotalHarcama);

module.exports = router;