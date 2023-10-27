import React, { useState } from "react";

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
    <div className="attend-conference-container">
      <div className="black-and-white-form">
        <h2 div className="text-center font-bold">Create Conference</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">Conference Name</label>
            <input
              type="email"
              id="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="conferenceDate">Conference Date</label>
            <input

            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">Conference Location</label>
            <input
              type="email"
              id="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">Number of Attendees</label>
            <input
              type="email"
              id="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">Conference Description</label>
            <input
              type="email"
              id="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group rounded-button-container font-bold">
            <button type="submit">Create!</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateConferenceForm;
