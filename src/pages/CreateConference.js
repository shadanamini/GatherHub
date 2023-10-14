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
    <div>
      <h2>Create Conference</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Conference Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={conferenceData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="maxAttendees">Max Attendees:</label>
          <input
            type="number"
            id="maxAttendees"
            name="maxAttendees"
            value={conferenceData.maxAttendees}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={conferenceData.city}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={conferenceData.state}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={conferenceData.country}
            onChange={handleInputChange}
          />
        </div>
        {/* Add input fields for presentations (e.g., an array of presentation names) */}
        {/* For presentations, you can add more input fields and use state to manage the list */}
        <div>
          <button type="submit">Create Conference</button>
        </div>
      </form>
    </div>
  );
};

export default CreateConferenceForm;
