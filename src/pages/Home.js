// Home.js
import React from "react";
import Navbar from "../components/Navbar";
import { useConferenceContext } from "./ConferenceContext";

const Home = () => {
  const { createdConferences } = useConferenceContext();

  const renderConferenceDetails = (conferences) => {
    return conferences.map((conference, index) => (
      <div key={index} className="flex mb-4 bg-black rounded-lg border border-white p-4">
        <div className="text-gray-300">
          <p>Name: {conference.Name}</p>
          <p>Date: {conference.Date}</p>
          <p>Location: {conference.Location}</p>
          <p>Attendees: {conference.Attendees}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="lg:overflow-y-hidden max-h-screen">
      <Navbar />
      <div className="h-[90vh] w-screen max-w-full grid grid-cols-2 items-center justify-items-center bg-base-200">
        {/* Left Side - Created Conferences */}
        <div className="h-[90%] w-[90%] bg-black rounded-xl p-4">
          <h2 className="text-white text-lg font-bold mb-4">Created Conferences</h2>
          {createdConferences && createdConferences.length > 0 ? (
            renderConferenceDetails(createdConferences)
          ) : (
            <p>No created conferences yet.</p>
          )}
        </div>

        {/* Right Side - Attending Conferences */}
        <div className="h-[90%] w-[90%] bg-black rounded-xl p-4">
          <h2 className="text-white text-lg font-bold mb-4">Attending Conferences</h2>
          {/* Render attending conference details if needed */}
        </div>
      </div>
    </div>
  );
};

export default Home;
