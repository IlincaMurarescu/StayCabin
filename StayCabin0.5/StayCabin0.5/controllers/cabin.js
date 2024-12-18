const path = require("path");
const Cabin = require("../models/Cabin");

exports.feed = (req, res) => {
  try {
    const cabins = Cabin.getAll(); // Use the model to get all cabins
    res.render("feed", { cabins }); // Pass cabins to the EJS file
  } catch (error) {
    console.error("Error fetching cabins:", error);
    res.status(500).send("Server Error");
  }
};

exports.getOwnedCabins = (req, res) => {
  console.log("GET OWNED CABINS FUNCTIONS OLEEE \n");
  console.log("id is: ", req.params.id);

  try {
    const userId = parseInt(req.params.id);

    if (!userId) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const allCabins = Cabin.getAll();
    const ownedCabins = allCabins.filter((cabin) => cabin.owner_id === userId);

    res.json(ownedCabins);
  } catch (error) {
    console.error("Error fetching owned cabins:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateDetails = (req, res) => {
  console.log("Update details function");

  const cabinId = parseInt(req.params.cabinId);
  const updatedData = req.body;

  const cabin = Cabin.getById(cabinId);

  if (!cabin) {
    return res.status(404).json({ message: "Cabin not found" });
  }

  if (cabin.owner_id !== req.session.userId) {
    return res
      .status(403)
      .json({ message: "You are not the owner of this cabin" });
  }

  const updatedCabin = Cabin.update(cabinId, updatedData);

  if (!updatedCabin) {
    console.log("Not updated cabin found");
    return res.status(500).json({ message: "Failed to update cabin details" });
  }

  return res.status(200).json({ message: "Success" });
};

exports.getCabinDetails = (req, res) => {
  console.log("Get cabin details function");

  const cabinId = parseInt(req.params.cabinId);

  const cabin = Cabin.getById(cabinId);

  console.log(cabin);

  if (!cabin) {
    return res.status(404).json({ message: "Cabin not found" }); // If cabin is not found, return a 404 error
  }

  return res.status(200).json(cabin);
};
