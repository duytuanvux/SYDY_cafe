const { addItem, getAllItem, removeItem, editItem } = require("../controllers/itemController")
const router = require("express").Router()

router.get("/getAllItem", getAllItem)
router.post("/addItem", addItem)
router.delete("/removeItem/:_id", removeItem)
router.post("/editItem/:_id", editItem)

module.exports = router