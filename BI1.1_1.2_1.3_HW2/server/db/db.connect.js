const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

async function initializeDatabase() {
  await mongoose
    .connect(mongoUri)
    .then(() => console.log("Connected to Database!"))
    .catch((error) =>
      console.log(
        "An error occured while trying to connect to Database!",
        error
      )
    );
}
module.exports = { initializeDatabase };
