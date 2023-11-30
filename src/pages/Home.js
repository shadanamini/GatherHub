// Home.js
import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { initializeApp } from "firebase/app";
import { getUserConferencesAdmin, getUserConferencesAttending, useCurrentUser, getConferenceInfo, editConference } from "../utils/Firebase";
import { getFirestore, doc, setDoc, updateDoc, arrayUnion, getDoc, query, where, onSnapshot, collection } from 'firebase/firestore';
const Home = () => {
  const user = useCurrentUser();
  const [adminConferences, setAdminConferences] = useState([]);
  const [attendingConferences, setAttendingConferences] = useState([]);
  const [codePopUpOpen, setCodePopUpOpen] = useState(false);
  const [popUpID, setPopUpID] = useState(0);
  const [editPopUpOpen, setEditPopUpOpen] = useState(false);

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

  useEffect(() => {
    async function some() {
      if(user) {
        setAdminConferences(await getUserConferencesAdmin(user.uid));
        setAttendingConferences(await getUserConferencesAttending(user.uid));
      }
    }
    some();
  }, [editPopUpOpen])

  return (
    <div className="lg:overflow-y-hidden max-h-screen">
      <Navbar />
      <div className="h-[90vh] w-screen max-w-full grid grid-cols-2 items-center justify-items-center bg-base-200">
        {/* Left Side - Created Conferences */}
        <div className="h-[90%] w-[90%] bg-black rounded-xl p-4 overflow-y-auto">
          <h2 className="text-white text-lg font-bold mb-4">Created Conferences</h2>
          {adminConferences?.map((con) => {
              return <AdminDisplay id={con.id} name={con.name} date={con.date} location={con.location} attendees={con.attendees.length} popUpTrue={popUpTrue} editPopUpTrue={editPopUpTrue} />
            })}
        </div>
        {/* Right Side - Attending Conferences */}
        <div className="h-[90%] w-[90%] bg-black rounded-xl p-4 overflow-y-auto">
          <h2 className="text-white text-lg font-bold mb-4">Attending Conferences</h2>
          {attendingConferences?.map((con) => {
              return <AttendingDisplay id={con.id} name={con.name} date={con.date} location={con.location} attendees={con.attendees.length} />
            })}
        </div>
      </div>
      {editPopUpOpen ? <EditPopUp popUpFalse={editPopUpFalse} id={popUpID}/> : <></>}
      {codePopUpOpen ? <CodePopUp popUpFalse={popUpFalse} id={popUpID}/> : <></>}
    </div>
  );
};

const AdminDisplay = (props) => {
  return (
    <div key={props.id} className="flex mb-4 bg-black rounded-lg border border-white p-4">
      <div className="text-gray-300 w-[85%]">
        <p>Name: {props.name}</p>
        <p>Date: {props.date}</p>
        <p>Location: {props.location}</p>
        <p>Attendees: {props.attendees}</p>
      </div>
      <div className="h-full w-[15%] flex flex-col justify-between">
        <button onClick={e => props.editPopUpTrue(props.id)} className="bg-white w-full flex justify-center items-center"><p className="text-xs">Edit</p></button>
        <button onClick={e => props.popUpTrue(props.id)} className="bg-white w-full flex justify-center items-center"><p className="text-xs">Code</p></button>
      </div>
    </div>
  )
}

const AttendingDisplay = (props) => {
  return (
    <div key={props.id} className="flex mb-4 bg-black rounded-lg border border-white p-4">
      <div className="text-gray-300 w-full">
        <p>Name: {props.name}</p>
        <p>Date: {props.date}</p>
        <p>Location: {props.location}</p>
        <p>Attendees: {props.attendees}</p>
      </div>
    </div>
  )
}

const CodePopUp = (props) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0, 0, 0, 0.5)] flex justify-center items-center z-40 backdrop-blur-sm">
      <div className='h-1/4 w-1/5 bg-white rounded-lg flex flex-col items-center z-50 justify-around p-2'>
        <h1 className="text-center text-3xl">Attendance Code</h1>
        <h1 className="text-2xl">{props.id}</h1>
        <button onClick={props.popUpFalse} className='flex justify-center items-center h-5'><p className="text-white">Close</p></button>
      </div>
    </div>
  )
}

const EditPopUp = (props) => {
  const user = useCurrentUser();
  const [confInfo, setConfInfo] = useState({});

  const nameRef = useRef();
  const dateRef = useRef();
  const locationRef = useRef();
  
  useEffect(() => {
    async function setConf() {
      if(user) {
        setConfInfo(await getConferenceInfo(props.id));
      }
    }
    setConf();
    console.log(confInfo)
  }, [])

  function handleSubmit(e) {
    e.preventDefault();
    editConference(props.id, nameRef.current.value, dateRef.current.value, locationRef.current.value);
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0, 0, 0, 0.5)] flex justify-center items-center z-40 backdrop-blur-sm">
      <div className='h-1/3 w-1/4 bg-white rounded-lg flex flex-col items-center z-50 justify-around p-2'>
      <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="Name">Conference Name</label>
              <input
                defaultValue={confInfo.name}
                ref={nameRef}
                placeholder="conference name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Date">Conference Date</label>
              <input
                defaultValue={confInfo.date}
                ref={dateRef}
                type="date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Location">Conference Location</label>
              <input
                defaultValue={confInfo.location}
                ref={locationRef}
                placeholder="conference location"
              />
            </div>
            <div className="form-group rounded-button-container font-bold">
              <button type="submit">Save</button>
            </div>
          </form>
        <button onClick={props.popUpFalse} className='flex justify-center items-center h-5'><p className="text-white">Close</p></button>
      </div>
    </div>
  )
}

export default Home;
