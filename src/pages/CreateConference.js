import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import { createConference } from "../utils/Firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateConferenceForm = () => {
  const nameRef = useRef();
  const dateRef = useRef();
  const locationRef = useRef();
  const numAttendeesRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createConference(
        nameRef.current.value,
        dateRef.current.value,
        locationRef.current.value,
        numAttendeesRef.current.value
      );

      // Show success toast
      toast.success('Conference Created');

      // Delay the redirect for 2 seconds (adjust the delay time as needed)
      setTimeout(() => {
        window.location.href = "home";
      }, 6000);
    } catch (error) {
      // Show error toast on failure
      toast.error('Error creating conference');
    }
  };

  return (
    <div className="max-h-screen overflow-y-hidden">
      <Navbar />
      <ToastContainer />
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
                type="date"
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
