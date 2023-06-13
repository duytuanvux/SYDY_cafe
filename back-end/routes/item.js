const { addItem, getAllItem, removeItem, editItem } = require("../controllers/itemController")
const middlewareController = require("../middlewares/middlewaresController")
const router = require("express").Router()

router.get("/getAllItem", getAllItem)
router.post("/addItem", middlewareController.verifyTokenandAdmin, addItem)
router.delete("/removeItem/:_id", middlewareController.verifyTokenandAdmin, removeItem)
router.post("/editItem/:_id", middlewareController.verifyTokenandAdmin, editItem)

module.exports = router