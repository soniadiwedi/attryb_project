const express = require('express');
const oemSpecsModel = require('../model/oemSpecModel');

const oemRouter = express.Router();


oemRouter.post('/add', async (req, res) => {
    const data = req.body;
  
    try {
      const newOem = new oemSpecsModel(data);
  
      await newOem.save();
      res.status(201).json({ msg: 'OEM specs added successfully', newOem });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });

oemRouter.get('/count', async (req, res) => {
  try {
    const count = await oemSpecsModel.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// http://localhost:5000/oem/search?model=bmw1&year=2023
oemRouter.get("/getspecs", async (req, res) => {
  const { search } = req.query;
  try {
    if (search) {
      let specs = await oemSpecsModel.find({
        $or: [
          { nameOfModel: { $regex: search, $options: "i" } },
          { yearOfModel: { $regex: search, $options: "i" } },
          { colors: { $regex: search, $options: "i" } },
        ],
      });
      res.status(200).send({ specs });
    } else {
      let specs = await oemSpecsModel.find({});
      res.send({ specs });
    }
  } catch (error) {
    res.send({ error });
  }
});
  


  
  module.exports = oemRouter;

//   "model":"maruti",
//   "year":2020,
//   "listPrice":50000,
//   "colors":["blue"],
//   "mileage":200,
//   "power":3,
//   "maxSpeed":60