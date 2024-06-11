const mongoose = require("mongoose");

const connect = async () => {
  await mongoose
    .connect("mongodb+srv://jasirmon133:3W6A9aoUY2yDio2a@cluster0.sbrhdax.mongodb.net/")
    .then((conn) => {
      console.log("Connection success");
    })
    .catch((err) => {
      console.error(err.message);
    });
};

module.exports = connect;
