// Home.js
import React from "react";
import Navbar from "../components/Navbar";
import { useConferenceContext } from "./ConferenceContext";

const Home = () => {
  const { createdConferences, attendedConferences } = useConferenceContext();

  const renderConferenceBubbles = (conferences) => {
    return conferences.map((conference, index) => (
      <div
        key={index}
        className="bubble-container mb-4 p-4 bg-black rounded-lg border border-white"
      >
        <p className="text-gray-300">Name: {conference.Name}</p>
        <p className="text-gray-300">Date: {conference.Date}</p>
        <p className="text-gray-300">Location: {conference.Location}</p>
        <p className="text-gray-300">Attendees: {conference.Attendees}</p>
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
            renderConferenceBubbles(createdConferences)
          ) : (
            <p>No created conferences yet.</p>
          )}
        </div>

        {/* Right Side - Attending Conferences */}
        <div className="h-[90%] w-[90%] bg-black rounded-xl p-4">
          <h2 className="text-white text-lg font-bold mb-4">Attending Conferences</h2>
          {attendedConferences && attendedConferences.length > 0 ? (
            renderConferenceBubbles(attendedConferences)
          ) : (
            <p>No attended conferences yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
