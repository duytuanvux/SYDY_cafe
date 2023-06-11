const Item = require('../models/item')

const itemController = {
    addItem : async(req,res) => {
        try {
            const newItem = await new Item({
                name : req.body.name,
                price : req.body.price
            })
            const item = await newItem.save()
            res.status(200).json(item)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAllItem : async(req, res) => {
        try {
            const item = await Item.find()
            res.status(200).json(item)
        } catch (error) {
            res.status().json(error)
        }
    },
    removeItem : async (req,res) => {
        try {
            const item = await Item.findByIdAndDelete(req.params._id)
            res.status(200).json("Xóa Thành Công")
        } catch (error) {
            res.status().json(error)
        }
    },
    editItem : async (req, res) => {
        try {
            const item = await Item.findByIdAndUpdate(req.params._id, {
                name : req.body.name,
                price : req.body.price
            } , { upsert: true, new: true})
           res.status(200).json(item)
        } catch (error) {
            res.status().json(error)
        }
    }

}

module.exports = itemController