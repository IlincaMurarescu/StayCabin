const express = require("express");
const cabinController = require("../controllers/cabin");
const router = express.Router();

router.get("/feed", cabinController.feed);

router.get("/ownedcabins/:id", cabinController.getOwnedCabins);

router.get("/cabinedetail/:cabinId", cabinController.getCabinDetails);

router.put("/updatedetails/:cabinId", cabinController.updateDetails);

module.exports = router;
