import React from "react";

const imageSrc =
  "https://storage.googleapis.com/leafautosphotos/photos/cl4hh8f4v0005356ecfys5v4k/cl5vwlefq0000366pgzx91ar0/IMG_20220309_134215.jpg";
const thumbSrc =
  "https://storage.googleapis.com/leafautosphotos/photos/cl4hh8f4v0005356ecfys5v4k/cl5vwlefq0000366pgzx91ar0/thumb_001_IMG_20220309_134215.jpg";

//

function parseMileage(mileage) {
  return Number(mileage) / 1000 + "K miles";
}

export const Vehicle = ({ vehicle: v }) => {
  return (
    <li
      className={` py-2 relative bg-no-repeat bg-cover w-72 h-64 m-1 rounded-xl overflow-hidden bg-center shadow-md border border-gray-600 `}
      style={{ backgroundImage: `url(${v.images[v.mainImgId].thumbs[0].url})` }}
    >
      <span className="text-center font-bold absolute bottom-0 px-2 py-2 bg-opacity-80 bg-white w-full border-t border-gray-600">
        {v.year} {v.make} {v.model}
      </span>
      {/* <a href={imageSrc} target="_blank" rel="noopener noreferrer"> */}
      {/* <img src={thumbSrc} alt="v" className="w-64 rounded" /> */}
      {/* </a> */}
      <span className="text-base px-2 border border-blue-900 bg-blue-100 py-1 text-blue-900 bg-opacity-90 absolute left-2 top-2 rounded">
        {parseMileage(v.mileage)}
      </span>
      <div className="pricing absolute flex items-center right-2 top-2 px-1 rounded-md py-1 bg-yellow-300">
        <span className="px-2 text-2xl text-yellow-900">
          ${v.discountPrice}
        </span>
        <span className="strikediag text-yellow-600">${v.sellingPrice}</span>
      </div>

      {/* <details>
        <summary>Details</summary>
        <pre className="text-xs">{JSON.stringify(v, null, 2)}</pre>
      </details> */}
    </li>
  );
};
