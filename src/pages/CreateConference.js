import React, { useState } from "react";
import Navbar from "../components/Navbar";

const CreateConferenceForm = () => {
  const [conferenceData, setConferenceData] = useState({
    name: "",
    maxAttendees: "",
    city: "",
    state: "",
    country: "",
    presentations: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConferenceData({
      ...conferenceData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission logic here
    console.log("Submitted data:", conferenceData);
  };

  return (
    <div className='max-h-screen overflow-y-hidden'>
      <Navbar />
      <div className="attend-conference-container overflow-y-hidden bg-base-200 h-[90vh]">
        <div className="black-and-white-form">
          <h2 div className="text-center font-bold">Create Conference</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">Conference Name</label>
              <input
                type="email"
                id="email"
                onChange={handleInputChange}
                placeholder="conference name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="conferenceDate">Conference Date</label>
              <input
                placeholder="conference date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">Conference Location</label>
              <input
                type="email"
                id="email"
                onChange={handleInputChange}
                placeholder="conference location"
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">Number of Attendees</label>
              <input
                type="email"
                id="email"
                onChange={handleInputChange}
                placeholder="number of attendees"
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="firstName">Conference Description</label>
              <input
                type="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            */}
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