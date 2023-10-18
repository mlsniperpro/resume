"use client";
import { useState } from "react";

import {  Header } from "./Navbar";
import Navbar from "./Navbar";


export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [timePeriod, setTimePeriod] = useState("allTime");
  const [newest, setNewest] = useState(false);
  const [language, setLanguage] = useState("all");
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <main className="px-4 lg:px-16 2xl:px-52 py-8">
      <Navbar onSearch={handleSearch} />
      <Header
        setTimePeriod={setTimePeriod}
        setNewest={setNewest}
        setLanguage={setLanguage}
      />
      <hr className="border border-gray-200 my-4" />
      <div className="flex flex-col-reverse xl:flex-row xl:space-x-4">
        <main className="xl:flex-grow pt-8 xl:pt-0">
          {/*<AvailablePrompts
            filterByTopic={false}
            timePeriod={timePeriod}
            newest={newest}
            language={language}
            searchQuery={searchQuery}
          />
            */}
          <p>Hello, here are the jobs listed</p>
        </main>
      </div>
    </main>
  );
}
