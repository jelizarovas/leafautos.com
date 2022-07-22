import React from "react";
import { getDocs, collection, doc } from "firebase/firestore";
import { db } from "./firebase";
import { Vehicle } from "./Vehicle";
export const Vehicles = () => {
  const [vehicleList, setVehicleList] = React.useState([]);
  const vehiclesCollectionRef = collection(db, "vehicles");

  React.useEffect(() => {
    const getVehicles = async () => {
      const data = await getDocs(vehiclesCollectionRef);
      setVehicleList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getVehicles();
  }, []);

  return (
    <div className="text-left">
      {vehicleList && vehicleList.length > 0 ? (
        vehicleList.map((v, i) => <Vehicle key={v.id} vehicle={v} />)
      ) : (
        <div>No Cars Found</div>
      )}
    </div>
  );
};
