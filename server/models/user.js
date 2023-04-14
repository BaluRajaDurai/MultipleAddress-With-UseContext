const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: { type: String },
    empNo: { type: String},
    accNo: { type: String},
    ifsc: { type: String },
    imgUrl: { type: Array },
    address: { type: Array},
  },
  { collection: "user-data" },
  { timestamps: true }
);
module.exports = mongoose.model("UserData", User);