// Home.js
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { initializeApp } from "firebase/app";
import { getUserConferencesAdmin, getUserConferencesAttending, useCurrentUser } from "../utils/Firebase";
import { getFirestore, doc, setDoc, updateDoc, arrayUnion, getDoc, query, where, onSnapshot, collection } from 'firebase/firestore';
const Home = () => {
  const user = useCurrentUser();
  const [adminConferences, setAdminConferences] = useState([]);
  const [attendingConferences, setAttendingConferences] = useState([]);
  const [codePopUpOpen, setCodePopUpOpen] = useState(false);

  function popUpTrue() {
    setCodePopUpOpen(true);
  }

  function popUpFalse() {
    setCodePopUpOpen(false);
  }

  useEffect(() => {
    async function some() {
      if(user) {
        setAdminConferences(await getUserConferencesAdmin(user.uid));
        setAttendingConferences(await getUserConferencesAttending(user.uid));
        console.log(adminConferences);
      }
    }
    some();
  }, [])

  return (
    <div className="lg:overflow-y-hidden max-h-screen">
      <Navbar />
      <div className="h-[90vh] w-screen max-w-full grid grid-cols-2 items-center justify-items-center bg-base-200">
        {/* Left Side - Created Conferences */}
        <div className="h-[90%] w-[90%] bg-black rounded-xl p-4">
          <h2 className="text-white text-lg font-bold mb-4">Created Conferences</h2>
          {adminConferences?.map((con) => {
              return <AdminDisplay id={con.id} name={con.name} date={con.date} location={con.location} attendees={con.attendees.length} popUpTrue={popUpTrue} popUpFalse={popUpFalse} codePopUpOpen={codePopUpOpen}/>
            })}
        </div>
        {/* Right Side - Attending Conferences */}
        <div className="h-[90%] w-[90%] bg-black rounded-xl p-4">
          <h2 className="text-white text-lg font-bold mb-4">Attending Conferences</h2>
          {attendingConferences?.map((con) => {
              return <AttendingDisplay id={con.id} name={con.name} date={con.date} location={con.location} attendees={con.attendees.length} />
            })}
        </div>
      </div>
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
        <button className="bg-white w-full flex justify-center items-center"><p className="text-xs">Edit</p></button>
        <button onClick={props.popUpTrue} className="bg-white w-full flex justify-center items-center"><p className="text-xs">Code</p></button>
      </div>
      {props.codePopUpOpen ? <CodePopUp popUpFalse={props.popUpFalse} id={props.id}/> : <></>}
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

export default Home;
