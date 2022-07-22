import React from "react";
import { getDocs, collection, doc } from "firebase/firestore";
import { db } from "./firebase";
import { Vehicle } from "./Vehicle";

const cars = [
  {
    interiorType: "",
    make: "CHRYSLER",
    exteriorColor: "Black",
    doors: "2",
    fuelType: "Gasoline",
    engineKW: "",
    engineCC: "3200.0",
    body: "Coupe",
    wheels: "4",
    interiorColor: "Tan",
    driveType: "RWD/Rear-Wheel Drive",
    endgineCylinders: "6",
    series: "ZH",
    trim: "Base",
    engineHP: "",
    buyingPrice: "",
    seats: "2",
    model: "Crossfire",
    transmissionSpeeds: "",
    year: "2006",
    vin: "1C3AN59L96X066289",
    transmissionStyle: "Automatic",
    buyingDate: "",
    mileage: "116000",
    sellingPrice: "8500",
    discountPrice: "6999",
    id: "cl4hh8f4v0005356ecfys5v4k",
    mainImgId: "cl4hh8f4v0005356ecfys5v4k",
    images: {
      cl5vwlefq0000366pgzx91ar0: {
        storagePath:
          "photos/cl4hh8f4v0005356ecfys5v4k/cl5vwlefq0000366pgzx91ar0/IMG_20220309_134215.jpg",
        url: "https://storage.googleapis.com/leafautosphotos/photos/cl4hh8f4v0005356ecfys5v4k/cl5vwlefq0000366pgzx91ar0/IMG_20220309_134215.jpg",
        thumbs: [
          "https://storage.googleapis.com/leafautosphotos/photos/cl4hh8f4v0005356ecfys5v4k/cl5vwlefq0000366pgzx91ar0/thumb_001_IMG_20220309_134215.jpg",
        ],
      },
    },
  },
];
export const Vehicles = () => {
  const [vehicleList, setVehicleList] = React.useState([...cars]);
  //   const vehiclesCollectionRef = collection(db, "vehicles");

  //   React.useEffect(() => {
  //     const getVehicles = async () => {
  //       const data = await getDocs(vehiclesCollectionRef);
  //       setVehicleList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     };

  //     getVehicles();
  //   }, []);

  return (
    <ul className="text-left">
      {vehicleList && vehicleList.length > 0 ? (
        vehicleList.map((v, i) => <Vehicle key={v.id} vehicle={v} />)
      ) : (
        <div>No Cars Found</div>
      )}
    </ul>
  );
};