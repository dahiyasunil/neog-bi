import AddHotel from "./components/AddHotel";
import HotelByName from "./components/HotelByName";
import Hotels from "./components/Hotels";

function App() {
  return (
    <>
      <AddHotel />
      <br />
      <Hotels />
      <br />
      <HotelByName hotelName="Seaside Retreat" />
    </>
  );
}

export default App;
