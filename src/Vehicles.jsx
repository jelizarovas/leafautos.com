import React from "react";
// import { getDocs, collection, query, where } from "firebase/firestore";
// import { db } from "./firebase";
import { VehicleCard } from "./VehicleCard";
import { Loading } from "./Loading";

// const vehiclesCollectionRef = collection(db, "vehicles");

export const Vehicles = ({ setVehicleId, ...props }) => {
  const [vehicleList, setVehicleList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    // const getVehicles = async () => {
    //   setLoading(true);

    //   const q = query(vehiclesCollectionRef, where("isPublic", "==", true));
    //   const data = await getDocs(q);
    //   console.log(`Read from database (${data.docs.length} reads)`);
    //   setVehicleList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //   setLoading(false);
    // };
    // getVehicles();

    const fetchData = async () => {
      setLoading(true);
      let localVehicles = JSON.parse(localStorage.getItem("vehicles"));
      // check if there is data in the local storage
      if (localVehicles) {
        // check if the data is not expired
        if (localVehicles.expiration > Date.now()) {
          setVehicleList(localVehicles.data);
          return setLoading(false);
        }
        localStorage.removeItem("vehicles");
      }
      // Fetch vehicles from Firebase Cloud Function HTTP endpoint
      try {
        const response = await fetch(
          "https://us-central1-leafautos.cloudfunctions.net/getVehiclesForSale"
        );
        console.log("fetching data...");
        const data = await response.json();
        console.log(`found ${data.length} vehicles!`);

        setVehicleList(data);

        // Save vehicles in local storage
        localStorage.setItem(
          "vehicles",
          JSON.stringify({
            data,
            expiration: Date.now() + 3600000,
          })
        );
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex-grow flex items-center  flex-col justify-center ">
        <Loading color="black" />
      </div>
    );

  return (
    <div className="flex-grow" {...props}>
      <div className="container mx-auto flex justify-end items-center">
        <h1 className="flex-grow text-center mt-6 mb-2 text-xl container mx-auto ">
          {vehicleList.length} Vehicles for sale
        </h1>
        {/* <button type="button" className="bg-red-500">
          Sort
        </button> */}
      </div>
      <ul className="text-left  mx-auto px-2 py-6 flex flex-wrap space-y-1 md:space-y-0 md:space-x-2 justify-center container items-center">
        {vehicleList && vehicleList.length > 0 ? (
          vehicleList.map((v, i) => (
            <VehicleCard key={v.id} vehicle={v} setVehicleId={setVehicleId} />
          ))
        ) : (
          <div>No Cars Found</div>
        )}
      </ul>
    </div>
  );
};
