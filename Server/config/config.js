const mongoose = require("mongoose");

const connect = async () => {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/FaceBook")
    .then((conn) => {
      console.log("Connection success");
    })
    .catch((err) => {
      console.error(err.message);
    });
};

module.exports = connect;
