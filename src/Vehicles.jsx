import React from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { VehicleCard } from "./VehicleCard";

const vehiclesCollectionRef = collection(db, "vehicles");

export const Vehicles = ({ setVehicleId, ...props }) => {
  const [vehicleList, setVehicleList] = React.useState([]);

  React.useEffect(() => {
    const getVehicles = async () => {
      const q = query(vehiclesCollectionRef, where("isPublic", "==", true));
      const data = await getDocs(q);
      console.log(`Read from database (${data.docs.length} reads)`);
      setVehicleList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getVehicles();
  }, []);

  return (
    <div {...props}>
      <h1 className="text-center mt-6 mb-2 text-xl container mx-auto ">
        {vehicleList.length} Vehicles for sale
      </h1>
      <ul className="text-left  mx-auto px-2 py-6 flex flex-wrap space-y-1 md:space-y-0 md:space-x-2 justify-center container items-center">
        {vehicleList && vehicleList.length > 0 ? (
          vehicleList.map((v, i) => <VehicleCard key={v.id} vehicle={v} setVehicleId={setVehicleId} />)
        ) : (
          <div>No Cars Found</div>
        )}
      </ul>
    </div>
  );
};
