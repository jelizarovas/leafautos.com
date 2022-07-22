import React from "react";

const imageSrc =
  "https://storage.googleapis.com/leafautosphotos/photos/cl4hh8f4v0005356ecfys5v4k/cl5vwlefq0000366pgzx91ar0/IMG_20220309_134215.jpg";
const thumbSrc =
  "https://storage.googleapis.com/leafautosphotos/photos/cl4hh8f4v0005356ecfys5v4k/cl5vwlefq0000366pgzx91ar0/thumb_001_IMG_20220309_134215.jpg";

//

export const Vehicle = ({ vehicle: v }) => {
  return (
    <li className="px-4 py-2 border">
      <span>
        {v.year} {v.make} {v.model} {v?.trim}
      </span>
      <a href={imageSrc} target="_blank" rel="noopener noreferrer">
        <img src={thumbSrc} alt="v" />
      </a>
      <span className="text-lg px-2">{v.mileage}</span>
      <span className="px-2">{v.discountPrice}</span>

      <span className="strikediag">{v.sellingPrice}</span>

      <details>
        <summary>Details</summary>
        <pre className="text-xs">{JSON.stringify(v, null, 2)}</pre>
      </details>
    </li>
  );
};
