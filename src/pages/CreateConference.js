// CreateConferenceForm.js
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useConferenceContext } from "./ConferenceContext";

const CreateConferenceForm = () => {
  const { addCreatedConference } = useConferenceContext();
  const [conferenceData, setConferenceData] = useState({
    Name: "",
    Date: "",
    Location: "",
    Attendees: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConferenceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCreatedConference(conferenceData);
    setConferenceData({
      Name: "",
      Date: "",
      Location: "",
      Attendees: "",
    });
  };

  return (
    <div className="max-h-screen overflow-y-hidden">
      <Navbar />
      <div className="attend-conference-container overflow-y-hidden bg-base-200 h-[90vh]">
        <div className="black-and-white-form">
          <h2 className="text-center font-bold">Create Conference</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="Name">Conference Name</label>
              <input
                type="text"
                id="Name"
                name="Name"
                onChange={handleInputChange}
                placeholder="conference name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Date">Conference Date</label>
              <input
                type="date"
                id="Date"
                name="Date"
                onChange={handleInputChange}
                placeholder="conference date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Location">Conference Location</label>
              <input
                type="text"
                id="Location"
                name="Location"
                onChange={handleInputChange}
                placeholder="conference location"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Attendees">Number of Attendees</label>
              <input
                type="number"
                id="Attendees"
                name="Attendees"
                onChange={handleInputChange}
                placeholder="number of attendees"
              />
            </div>
            <div className="form-group rounded-button-container font-bold">
              <button type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateConferenceForm;
