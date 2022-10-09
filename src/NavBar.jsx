import React from "react";
// import { Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";

export const NavBar = () => {
  return (
    <div className="bg-main text-white py-1 select-none">
      <div className="container flex items-center space-x-4 mx-auto justify-around">
        <div className="px-4 py-2 flex items-center space-x-4">
          <img
            src="/img/logo.png"
            alt="logo"
            className="max-h-5"
            draggable={false}
          />
          <span className=" uppercase text-sm">Leaf Autos</span>
        </div>
        <div className="border hidden  border-white w-96 h-7 my-1 rounded  lg:hidden items-center justify-around space-x-4">
          <input
            type="text"
            className="bg-transparent flex-grow outline-none px-4"
          />
          <span className="text-[8px] border border-white p-0.5 rounded bg-white bg-opacity-20">
            Alt + z
          </span>
          <span className="pr-2">
            <MdSearch className="" />
          </span>
        </div>
        <nav className="flex space-x-4">
          {/* <NavLink to="/add" label="➕ Car" />
          <NavLink to="/vehicles" label="📂 All Cars" /> */}
        </nav>
      </div>
    </div>
  );
};

// const NavLink = ({ label, to, ...props }) => (
//   <Link
//     className="px-2 py-1 hover:bg-white hover:bg-opacity-20 hover:rounded"
//     to={to}
//     {...props}
//   >
//     {label}
//   </Link>
// );
