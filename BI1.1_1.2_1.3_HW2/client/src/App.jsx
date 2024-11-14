import HotelByName from "./components/HotelByName";
import Hotels from "./components/Hotels";

function App() {
  return (
    <>
      <Hotels />
      <br />
      <HotelByName hotelName="Seaside Retreat" />
    </>
  );
}

export default App;
