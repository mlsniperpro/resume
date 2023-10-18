"use client";

import { useState } from "react";
import Jobs from "../components/Jobs";


const Sidebar = () => {
  const [sidenav, setSidenav] = useState(true);

  return (
    <div
      id="view"
      className="h-full w-screen flex flex-row font-poppins antialiased"
    >
      <button
        onClick={() => setSidenav(true)}
        className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden"
      >
        <svg
          className="w-5 h-5 fill-current"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      {sidenav && (
        <div
          id="sidebar"
          className="bg-white h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
          onClick={() => setSidenav(true)}
        >
          <div className="space-y-6 md:space-y-10 mt-10">
            <h1 className="font-bold text-4xl text-center md:hidden">
              D<span className="text-teal-600">.</span>
            </h1>
            <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
              Dashwind<span className="text-teal-600">.</span>
            </h1>
            <div id="profile" className="space-y-3">
              <img
                src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt="Avatar user"
                className="w-10 md:w-16 rounded-full mx-auto"
              />
              <div>
                <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
                  Eduard Pantazi
                </h2>
                <p className="text-xs text-gray-500 text-center">
                  Candidate
                </p>
              </div>
            </div>
            <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
              The Resume Check Score
            </h2>
            <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
              AI Response
            </h2>
            <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
              Relevant Jobs
            </h2>
            {/*<Jobs />*/}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
