const mongoose = require('mongoose');

const oemSpecsSchema = new mongoose.Schema({
  nameOfModel: { required: true, type: String },
  yearOfModel: { required: true, type: String },
  newPriceOfVehicle: { required: true, type: Number },
  colors: { required: true, type: Array },
  mileage: { required: true, type: Number },
  power: { required: true, type: Number },
  maxSpeed: { required: true, type: Number },
 
});

const oemSpecsModel = mongoose.model('oemspecs', oemSpecsSchema);

module.exports = oemSpecsModel;

// {
//   "nameOfModel": "Audi",
//  "yearOfModel": "2022",
//  "newPriceOfVehicle": 50000,
//  "colors": ["Voilet","blue"],
//  "mileage":2,
//  "power": 2,
//  "maxSpeed": 50

// }