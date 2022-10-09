import React from "react";
function parseMileage(mileage) {
  return Math.floor(Number(mileage.replace(/\D/g, "")) / 1000) + "K miles";
}

export const VehicleCard = ({ vehicle: v }) => {
  return (
    <li
      className={`text-sm  relative bg-no-repeat bg-cover w-full sm:w-72 h-64    bg-center   `}
      style={{
        backgroundImage: `url(${
          v?.images?.[v?.mainImgId]?.thumbs?.[1]?.url ||
          v?.images?.[v?.mainImgId]?.thumbs?.[0]?.url ||
          "/img/car.png"
        })`,
      }}
    >
      <div className="flex flex-wrap justify-between absolute bottom-0 px-2 py-2 bg-white w-full">
        <span className="uppercase font-bold whitespace-nowrap">
          {v?.year} {v?.make} {v?.model}
        </span>

        {v?.mileage && (
          <span className="  whitespace-nowrap">{parseMileage(v.mileage)}</span>
        )}
      </div>
      {v?.sellingPrice && (
        <div className="pricing absolute flex items-center right-2 top-2 px-2  py-1 bg-black text-white">
          <span className="px-2 text-base ">
            ${v?.discountPrice || v.sellingPrice}
          </span>
          {v?.discountPrice && (
            <span className="strikediag ">${v.sellingPrice}</span>
          )}
        </div>
      )}
    </li>
  );
};
