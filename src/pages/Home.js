// Home.js
import React from "react";
import Navbar from "../components/Navbar";
import { useConferenceContext } from "./ConferenceContext";

const Home = () => {
  const { createdConferences, attendedConferences, addAttendedConference } = useConferenceContext();

    const renderConferenceBubbles = (conferences) => {
    return conferences.map((conference, index) => (
        <div key={index} className="flex mb-4 bg-black rounded-lg border border-white p-4 relative">
        <div className="text-gray-300">
            <p>Name: {conference.Name}</p>
            <p>Date: {conference.Date}</p>
            <p>Location: {conference.Location}</p>
            <p>Attendees: {conference.Attendees}</p>
        </div>
        <button
            className="absolute top-0 right-0 m-2 bg-white text-black font-bold py-2 px-4 rounded-full"
            onClick={() => handleAttendClick(conference)}
        >
            ✔
        </button>
        </div>
    ));
    };

  const handleAttendClick = (conference) => {
    // Add the selected conference to the "Attending Conferences" list
    addAttendedConference(conference);
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
