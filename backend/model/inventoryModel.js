const mongoose = require('mongoose');
const oemSpecsModel = require('./oemSpecModel');
// const oemSpecsModel = require('./OemSpecs')
const {UsersModel}=require("./userModel")


const inventorySchema = new mongoose.Schema({
 
  km: { type: Number, required: true },
  majorScratches: { required: true, type: String },
  price: { required: true, type: Number },
  orginalPaint: { required: true, type: String },
  accidents: { required: true, type: Number },
  prevBuyers: { required: true, type: Number },
  registrationPlace: { required: true, type: String },
  oemId: { type: mongoose.Schema.Types.ObjectId, ref: oemSpecsModel },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: UsersModel },
  img: { type: String, required: true },
  title: { type: String, required: true },
  des:{type:Array,required:true}
});

const InventoryModel = mongoose.model('Inventory', inventorySchema);

module.exports = InventoryModel;