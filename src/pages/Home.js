// Home.js
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import {
  getUserConferencesAdmin,
  getUserConferencesAttending,
  useCurrentUser,
  getConferenceInfo,
  editConference,
  deleteConference,
  leaveConference,
} from "../utils/Firebase";

const Home = () => {
  const user = useCurrentUser();
  const [adminConferences, setAdminConferences] = useState([]);
  const [attendingConferences, setAttendingConferences] = useState([]);
  const [codePopUpOpen, setCodePopUpOpen] = useState(false);
  const [popUpID, setPopUpID] = useState(0);
  const [editPopUpOpen, setEditPopUpOpen] = useState(false);
  const [rerender, setRerender] = useState(false);

  function popUpTrue(id) {
    setCodePopUpOpen(true);
    setPopUpID(id);
  }

  function popUpFalse() {
    setCodePopUpOpen(false);
  }

  function editPopUpTrue(id) {
    setEditPopUpOpen(true);
    setPopUpID(id);
  }

  function editPopUpFalse() {
    setEditPopUpOpen(false);
  }

  function deleteConf(id) {
    deleteConference(id);
    if (rerender) {
      setRerender(false);
    }
    else {
      setRerender(true);
    }
    toast.error("You have deleted this conference");
  }

  async function leaveConf(id) {
    await leaveConference(id);
    if (rerender) {
      setRerender(false);
    }
    else {
      setRerender(true);
    }
    toast.error("You are no longer attending this conference");
  }

  useEffect(() => {
    async function some() {
      if (user) {
        setAdminConferences(await getUserConferencesAdmin(user.uid));
        setAttendingConferences(await getUserConferencesAttending(user.uid));
      }
    }
    some();
  }, [editPopUpOpen, rerender]);

  return (
    <div className="lg:overflow-y-hidden max-h-screen">
      <ToastContainer/>
      <Navbar />
      <div className="h-[90vh] w-screen max-w-full grid grid-cols-2 items-center justify-items-center bg-base-200">
        {/* Left Side - Created Conferences */}
        <div className="h-[90%] w-[90%] bg-black rounded-xl p-4 overflow-y-auto">
          <h2 className="text-white text-lg font-bold mb-4 text-center">Created Conferences</h2>
          {adminConferences.length ? adminConferences?.map((con) => {
            return (
              <AdminDisplay
                key={con.id}
                id={con.id}
                name={con.name}
                date={con.date}
                location={con.location}
                attendees={con.attendees.length}
                maxAttendees={con.maxAttendees}
                popUpTrue={popUpTrue}
                editPopUpTrue={editPopUpTrue}
                deleteConf={deleteConf}
                con={con}
              />
            );
          }) : <></>}
        </div>
        {/* Right Side - Attending Conferences */}
        <div className="h-[90%] w-[90%] bg-black rounded-xl p-4 overflow-y-auto">
          <h2 className="text-white text-lg font-bold mb-4 text-center">Attending Conferences</h2>
          {attendingConferences.length ? attendingConferences?.map((con) => {
            return (
              <AttendingDisplay
                key={con.id}
                id={con.id}
                name={con.name}
                date={con.date}
                location={con.location}
                attendees={con.attendees.length}
                maxAttendees={con.maxAttendees}
                leaveConf={leaveConf}
                con={con}
              />
            );
          }) : <></>}
        </div>
      </div>
      {editPopUpOpen ? <EditPopUp popUpFalse={editPopUpFalse} id={popUpID} /> : <></>}
      {codePopUpOpen ? <CodePopUp popUpFalse={popUpFalse} id={popUpID} /> : <></>}
    </div>
  );
};

const AdminDisplay = (props) => {
  const navigate = useNavigate();

  return (
    <div key={props.id} className="flex mb-4 bg-black rounded-lg border border-white p-4">
      <div className="text-gray-300 w-[85%]">
        <p>Name: {props.name}</p>
        <p>Date: {props.date}</p>
        <p>Location: {props.location}</p>
        <p>Attendees: {props.attendees}</p>
        <p>Max Attendees: {props.maxAttendees}</p>
      </div>
      <div className="h-full w-[15%] flex flex-col justify-between">
        <button onClick={(e) => props.editPopUpTrue(props.id)} className="bg-white w-full flex justify-center items-center">
          <p className="text-xs">Edit</p>
        </button>
        <button onClick={(e) => props.popUpTrue(props.id)} className="bg-white w-full flex justify-center items-center">
          <p className="text-xs">Code</p>
        </button>
      </div>
      <div className="h-full w-[15%] flex flex-col justify-between ml-5">
        <button onClick={(e) => navigate('/events', {state: {conference: props.con, admin: true}})} className="bg-white w-full flex justify-center items-center">
          <p className="text-xs">Events</p>
        </button>
        <button onClick={(e) => props.deleteConf(props.id)} className="bg-red-600 w-full flex justify-center items-center">
          <p className="text-xs">Delete</p>
        </button>
      </div>
    </div>
  );
};

const AttendingDisplay = (props) => {
  const navigate = useNavigate();

  return (
    <div key={props.id} className="flex mb-4 bg-black rounded-lg border border-white p-4">
      <div className="text-gray-300 w-[85%]">
        <p>Name: {props.name}</p>
        <p>Date: {props.date}</p>
        <p>Location: {props.location}</p>
        <p>Attendees: {props.attendees}</p>
        <p>Max Attendees: {props.maxAttendees}</p>
      </div>
      <div className="h-full w-[15%] flex flex-col justify-between">
        <button onClick={(e) => navigate('/events', {state: {conference: props.con, admin: false}})} className="bg-white w-full flex justify-center items-center">
          <p className="text-xs">Events</p>
        </button>
        <button onClick={(e) => props.leaveConf(props.id)} className="bg-red-600 w-full flex justify-center items-center">
          <p className="text-xs">Leave</p>
        </button>
      </div>
    </div>
  );
};

const CodePopUp = (props) => {
  function handleOutsideClick(e) {
    if (e.target.classList.contains('code-popup-overlay')) {
      props.popUpFalse();
    }
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0, 0, 0, 0.5)] flex justify-center items-center z-40 backdrop-blur-sm code-popup-overlay" onClick={handleOutsideClick}>
      <div className='h-[25%] w-[20%] bg-white rounded-lg flex flex-col items-center z-50 justify-around p-2'>
        <h1 className="text-center text-3xl">Attendance Code</h1>
        <h1 className="text-2xl">{props.id}</h1>
      </div>
    </div>
  );
};

const EditPopUp = (props) => {
  const user = useCurrentUser();
  const [confInfo, setConfInfo] = useState({});
  const nameRef = useRef();
  const dateRef = useRef();
  const locationRef = useRef();

  useEffect(() => {
    async function setConf() {
      if (user) {
        setConfInfo(await getConferenceInfo(props.id));
      }
    }
    setConf();
  }, [props.id, user]);

  function handleSubmit(e) {
    e.preventDefault();
    editConference(props.id, nameRef.current.value, dateRef.current.value, locationRef.current.value);

    // Show success message using toastify
    toast.success('You\'ve updated the conference successfully.', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function handleOutsideClick(e) {
    if (e.target.classList.contains('edit-popup-overlay')) {
      props.popUpFalse();
    }
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0, 0, 0, 0.5)] flex justify-center items-center z-40 backdrop-blur-sm edit-popup-overlay" onClick={handleOutsideClick}>
        <div className='h-[60vh] w-[30vw] bg-white rounded-lg flex flex-col items-center z-50 justify-around p-2'>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="Name">Conference Name</label>
              <input defaultValue={confInfo.name} ref={nameRef} placeholder="Conference name" />
            </div>
            <div className="form-group">
              <label htmlFor="Date">Conference Date</label>
              <input defaultValue={confInfo.date} ref={dateRef} type="date" />
            </div>
            <div className="form-group">
              <label htmlFor="Location">Conference Location</label>
              <input defaultValue={confInfo.location} ref={locationRef} placeholder="Conference location" />
            </div>
            <div className="form-group rounded-button-container font-bold">
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
