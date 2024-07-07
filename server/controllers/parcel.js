const Parcel = require("../models/Parcel");

//Create new Parcel
 const newParcel = async (req, res) => {
  try {
    const parcel = Parcel(req.body);
    const newP = await parcel.save();
    res.status(200).json(newP);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get all Parcels
 const getAllParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find().sort({ createdAt: -1 });
    res.status(200).json(parcels);
  } catch (error) {
    res.status(500).json(error);
  }
};
//Get Users Parcel
 const getUsersParcel = async (req, res) => {
  try {
    const parcels = await Parcel.find({
      senderemail: req.body.senderemail,
    }).sort({ createdAt: -1 });
    if(parcels.length === 0){
      return res.status(404).json("Sender has not send any parcel yet.")
    }
    res.status(200).json(parcels);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get one parcel
 const getOneParcel = async (req, res) => {
  const id = req.params.id;
  try {
    const oneParcel = await Parcel.findById(id);
    res.status(200).json(oneParcel);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Update Parcel
 const updateParcel = async (req, res) => {
  const id = req.params.id;
  try {
    const editParcel = await Parcel.findById(id);
    if (!editParcel) {
      return res.status(404).json({ message: "Parcel not found" });
    }

    // Update the parcel's properties with the new data from the request body
    Object.assign(editParcel, req.body);

    const updatedParcel = await editParcel.save();
    res.status(200).json(updatedParcel)
  } catch (error) {
    console.log(error)
  }
};

//delete Parcel
 const deleteParcel = async (req, res) => {
  const id = req.params.id;
  try {
    await Parcel.findByIdAndDelete(id);
    res.status(200).json("parcel deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports ={
    newParcel,
    getAllParcels,
    getUsersParcel,
    getOneParcel,
    updateParcel,
    deleteParcel
}
