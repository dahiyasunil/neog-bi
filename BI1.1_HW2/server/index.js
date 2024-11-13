const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const Hotel = require("./models/hotel.models");
require("dotenv").config();

initializeDatabase();

const corsOption = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app = express();
app.use(express.json());

app.use(cors(corsOption));

// * Read all hotels from the database
async function readAllHotels() {
  try {
    return await Hotel.find();
  } catch (error) {
    console.log(
      "An error occured while trying to read details of all hotels.",
      error
    );
    throw error;
  }
}

app.get("/hotels", async (req, res) => {
  try {
    const allHotels = await readAllHotels();
    if (allHotels.length != 0) {
      res.json(allHotels);
    } else {
      res.status(204).json({ msg: "No Hotels in database." });
    }
  } catch (err) {
    res.status(500).json({ msg: "Error while fetching hotels data." });
  }
});

// * Read a hotel by its name
async function readHotelByName(hotelName) {
  try {
    return await Hotel.findOne({ name: hotelName });
  } catch (error) {
    console.log(
      `An error occured while trying to read details of hotel with name: ${hotelName}.`,
      error
    );
    throw error;
  }
}

app.get("/hotels/:hotelName", async (req, res) => {
  try {
    const hotel = await readHotelByName(req.params.hotelName);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(204).json({ msg: "No hotel found." });
    }
  } catch (err) {
    res.status(500).json({ msg: "Error while fetching hotel data." });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
