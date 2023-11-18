import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { createConference } from "../utils/Firebase";

const CreateConferenceForm = () => {
  //const { addCreatedConference } = useConferenceContext();
  /*const [conferenceData, setConferenceData] = useState({
    name: "",
    numAttendees: "",
    location: "",
    date: ""
  });*/

  const nameRef = useRef();
  const dateRef = useRef();
  const locationRef = useRef();
  const numAttendeesRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission logic here
    try{
      createConference(nameRef.current.value, dateRef.current.value, locationRef.current.value, numAttendeesRef.current.value);
      alert('Conference Created');
    } catch {
      alert('error');
    }
    window.location.href = "home";
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
                ref={nameRef}
                placeholder="conference name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Date">Conference Date</label>
              <input
                ref={dateRef}
                placeholder="conference date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Location">Conference Location</label>
              <input
                ref={locationRef}
                placeholder="conference location"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Attendees">Number of Attendees</label>
              <input
                ref={numAttendeesRef}
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
