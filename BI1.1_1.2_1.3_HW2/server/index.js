const express = require("express");
const cors = require("cors");
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

// * Create new hotel
async function createHotel(hotelData) {
  try {
    const newHotel = new Hotel(hotelData);
    return await newHotel.save();
  } catch (err) {
    throw new Error(`Failed to save hotel: ${err.message}`);
  }
}

app.post("/hotels", async (req, res) => {
  try {
    const newHotelData = req.body;

    if (
      !newHotelData.name ||
      !newHotelData.category ||
      !newHotelData.location ||
      !newHotelData.phoneNumber ||
      !newHotelData.checkInTime ||
      !newHotelData.checkOutTime
    ) {
      return res.status(400).json({
        msg: `name, category, location, phoneNumber, checkInTime and checkOutTime are required!`,
      });
    } else {
      const hotel = await createHotel(newHotelData);
      if (hotel) {
        res.status(201).json({ msg: `Hotel added successfully!` });
      }
    }
  } catch (err) {
    res.status(500).json({ msg: `Failed to add hotel!` });
    console.log(`Failed to add hotel in database.
      ${err.message}`);
  }
});

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
      res.status(200).json({ data: allHotels });
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
      res.status(200).json({ data: hotel });
    } else {
      res.status(204).json({ msg: "No hotel found." });
    }
  } catch (err) {
    res.status(500).json({ msg: "Error while fetching hotel data." });
  }
});

// * Delete hotel by ID
async function deleteHotelByID(hotelId) {
  try {
    return await Hotel.findByIdAndDelete(hotelId);
  } catch (err) {
    throw new Error(
      `An error occured while trying to delete Hotel. ${err.message}`
    );
  }
}

app.delete("/hotels/delete/id/:id", async (req, res) => {
  const hotelId = req.params.id;
  try {
    const deletedHotel = await deleteHotelByID(hotelId);
    if (deletedHotel) {
      res.status(200).json({ msg: `Hotel deleted successfully!` });
    } else {
      res.status(404).json({ msg: `No hotel found.` });
    }
  } catch (err) {
    res.status(500).json({ msg: `Failed to delete the Hotel.` });
    console.error(`Failed to delete the Hotel by id ${hotelId}.
      Error: ${err.message}`);
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
