import React from "react";

export const Vehicle = ({ vehicle }) => {
  return (
    <div className="px-4 py-2 border">
      <span>
        {vehicle.year} {vehicle.make} {vehicle.model} {vehicle?.trim}
      </span>
      <details>
        <summary>Details</summary>
        <pre className="text-xs">{JSON.stringify(vehicle, null, 2)}</pre>
      </details>
    </div>
  );
};
