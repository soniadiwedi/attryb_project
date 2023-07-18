const mongoose = require("mongoose");
const { oemSpecsModel } = require("./oemSpecsModel.js");
const { UserModel } = require("./userModel.js");

//this is the inventory model Schema which states that all the keys of inventory document will not more than 
//thsese given keys and of specific types mentioned also

const inventoryModelSchema = mongoose.Schema({
  km: { type: Number, required: true },
  majorScratches: { required: true, type: String },
  price: { required: true, type: Number },
  orginalPaint: { required: true, type: String },
  accidents: { required: true, type: Number },
  prevBuyers: { required: true, type: Number },
  registrationPlace: { required: true, type: String },
  oemId: { type: mongoose.Schema.Types.ObjectId, ref: oemSpecsModel },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: UserModel },
  img: { type: String, required: true },
  title: { type: String, required: true },
  des:{type:Array,required:true}
  
});

const InventoryModel = mongoose.model("inventory", inventoryModelSchema);

module.exports = { InventoryModel };