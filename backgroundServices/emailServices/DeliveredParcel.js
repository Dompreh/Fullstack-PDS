require("dotenv").config();
const ejs = require("ejs");
const sendmail = require("../helpers/sendMail");
const Parcel = require("../models/Parcel");

const sendDeliveredParcelEmail = async () => {
  const parcels = await Parcel.find({ status: 2 });

  if (parcels.length > 0) {
    for (let parcel of parcels) {
      ejs.renderFile(
        "templates/deliveredparcel.ejs",
        {
          sendername: parcel.sendername,
          from: parcel.from,
          to: parcel.to,
          recipientname: parcel.recipientname,
          cost: parcel.cost,
          weight: parcel.weight,
          note: parcel.note,
        },
        async (err, info) => {
          let messageOption = {
            from: process.env.EMAIL,
            to: parcel.senderemail,
            subject: "Your parcel has been delivered",
            html: info,
          };

          try {
            await sendmail(messageOption);
          } catch (error) {
            console.log(error);
          }
        }
      );
      ejs.renderFile(
        "templates/deliveredparcel.ejs",
        {
          sendername: parcel.sendername,
          from: parcel.from,
          to: parcel.to,
          recipientname: parcel.recipientname,
          cost: parcel.cost,
          weight: parcel.weight,
          note: parcel.note,
        },
        async (err, info) => {
          let messageOption = {
            from: process.env.EMAIL,
            to: parcel.recipientemail,
            subject: "Your parcel has been delivered",
            html: info,
          };

          try {
            await sendmail(messageOption);
            await Parcel.findByIdAndUpdate(parcel._id, { $set: { status: 3 } });
          } catch (error) {
            console.log(error);
          }
        }
      );
    }
  }
};

module.exports = {sendDeliveredParcelEmail};
