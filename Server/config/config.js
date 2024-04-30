const mongoose = require("mongoose");

const connect = async () => {
  await mongoose
    .connect("mongodb+srv://fixeca4451:x9UkVvB3aZznXZYW@cluster0.laedogl.mongodb.net/")
    .then((conn) => {
      console.log("Connection success");
    })
    .catch((err) => {
      console.error(err.message);
    });
};

module.exports = connect;
