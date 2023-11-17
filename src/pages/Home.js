// Home.js
import React from "react";
import Navbar from "../components/Navbar";
import { useConferenceContext } from "./ConferenceContext";

const Home = () => {
  const { createdConferences } = useConferenceContext();

  return (
    <div className="lg:overflow-y-hidden max-h-screen">
      <Navbar />
      <div className="h-[90vh] w-screen max-w-full grid grid-cols-2 items-center justify-items-center bg-base-200">
        <div className="h-[90%] w-[90%] bg-black rounded-xl">
          <h2 className="text-white text-lg font-bold mb-4">
            Created Conferences
          </h2>
          {createdConferences.map((conference, index) => (
            <div key={index} className="text-gray-300">
              <p>Name: {conference.Name}</p>
              <p>Date: {conference.Date}</p>
              <p>Location: {conference.Location}</p>
              <p>Attendees: {conference.Attendees}</p>
            </div>
          ))}
        </div>
        {/* Add other components as needed */}
      </div>
    </div>
  );
};

export default Home;
