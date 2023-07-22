const express = require("express");
const inventoryRouter = express.Router();
const InventoryModel = require("../model/inventoryModel");
const { authentication } = require("../middleware/authentication");
// http://localhost:5000/inventory/add
inventoryRouter.post("/add",authentication, async (req, res) => {
  try {
  const data = req.body;

    const newInventory = new InventoryModel(data);

    await newInventory.save();
    res
      .status(201)
      .json({ msg: "Inventory created successfully", newInventory });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});




// http://localhost:5000/inventory/list?filter=price&order=asc

inventoryRouter.get("/list", async (req, res) => {
  // const search="Honda"
  const { order, filter, search } = req.query;
  try {
    if (filter === "price") {
      let deals;
     
      if (order == "desc") {
        deals = await InventoryModel.find({})
          .populate("oemId")
          .sort({ price: -1 });
        console.log(deals);
      } else {
     
        deals = await InventoryModel.find({})
          .populate("oemId")
          .sort({ price: 1 });
      }

      res.status(200).send({ deals });
    } else if (filter == "mileage") {
      let deals = await InventoryModel.find({}).populate("oemId").lean();

      if (order == "desc") {
        
        deals.sort((a, b) => b.oemId.mileage - a.oemId.mileage);
      } else {
        deals.sort((a, b) => a.oemId.mileage - b.oemId.mileage);
      }

      res.status(200).send({ deals });
    } else if (filter === "colors") {

      let deals = await InventoryModel.find({}).populate({
        path: "oemId",
        match: { colors: { $regex: order, $options: "i" } },
      });
      deals = deals.filter((deal) => deal.oemId !== null);

      res.status(200).send({ deals });
    } else {
      let deals = await InventoryModel.find({}).populate({
        path: "oemId",
      });

      res.status(200).send({ deals });
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// inventoryRouter.get("/inventory/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     let deals = await InventoryModel.findById(id);
//     res.status(200).send({ deals });
//   } catch (error) {
//     res.status(500).send({ msg: error.message });
//   }
// });

inventoryRouter.delete("/delete/:id",authentication, async (req, res) => {
  try {
    const { id } = req.params;
    await InventoryModel.findByIdAndDelete(id);
    res.status(200).json({ msg: "Inventory entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// http://localhost:5000/inventory/edit/64b773a8d1ddf08c3af73785
inventoryRouter.patch("/edit/:_id", authentication,async (req, res) => {
  try {
    const { _id } = req.params;
    // const {
    //   carModel,
    //   odometerKMs,
    //   majorScratches,
    //   originalPaint,
    //   accidentsReported,
    //   previousBuyers,
    //   registrationPlace,
    //   image,
    //   des,
    //   oemId,
    //   userId,
    // } = req.body;
    const data = req.body;
    
    const updatedInventory = await InventoryModel.findByIdAndUpdate(
      _id,
     data ,
      { new: true }
    );
      
    res
      .status(200)
      .json({ msg: "Inventory entry updated successfully", updatedInventory });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = inventoryRouter;

// {
//   "km": 110,
//   "majorScratches": "No",
//   "price": 3000,
//   "orginalPaint": "No",
//   "accidents": 1,
//   "prevBuyers":2,
//   "registrationPlace": "mumbai",
//   "oemId": "64bb6a13352387382e2ff4d4",
//   "userId": "64bb6d1343c46332dd156d77",
//   "img": "https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym13JTIwY2FyfGVufDB8fDB8fHww&w=1000&q=80",
//   "title": "Car photo",
//   "des":["Car Images | Car Photos | Pics of New Cars | Latest","Download the perfect car pictures. Find over 100+ of the best free car images. Free for"]
 
// }