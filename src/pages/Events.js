import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createEvent } from "../utils/Firebase";
import { toast, ToastContainer } from 'react-toastify';
import { useCurrentUser, getConferenceInfo, deleteEvent } from "../utils/Firebase";
import 'react-toastify/dist/ReactToastify.css';

const Events = () => {
    const location = useLocation();
    const conf = location.state.conference;
    const [events, setEvents] = useState();
    const [createPopUpOpen, setCreatePopUpOpen] = useState(false);
    const [rerender, setRerender] = useState(false);
    const admin = location.state.admin;

    useEffect(() => {
        async function set() {
            const data = await getConferenceInfo(conf.id);
            setEvents(data.events.sort(function(a, b){
                const hoursA = parseInt(a.time.split(":")[0]);
                const minsA = parseInt(a.time.split(":")[1]);
                const hoursB = parseInt(b.time.split(":")[0]);
                const minsB = parseInt(b.time.split(":")[1]);
                if(hoursA != hoursB) {
                    return hoursA - hoursB;
                }
                return minsA - minsB;
            }));
        }
        set();
    }, [createPopUpOpen, rerender])

    function createPopUpTrue() {
        setCreatePopUpOpen(true);
    }

    function createPopUpFalse() {
        setCreatePopUpOpen(false);
    }

    async function delEvent(id) {
        await deleteEvent(conf.id, id);
        setRerender(!rerender);
        toast.error("You have deleted the event")
    }

    return (
        <div className="lg:overflow-y-hidden h-screen w-screen max-w-full bg-base-200">
            <ToastContainer />
            <Navbar />
            <div className="h-[10vh] flex justify-center items-center">
                <div className="text-3xl">Conference: {conf.name}</div>
            </div>
            <div className="h-[80vh] flex justify-center items-center">
                <div className="rounded-xl flex flex-col bg-black h-[90%] w-[90%]">
                    <div className="h-[5vh] flex justify-end">
                        {admin ? <button className="mr-5 rounded-xl bg-white" onClick={createPopUpTrue}>Add Event</button> : <></>}
                    </div>
                    <div className="h-[75vh] flex justify-center items-center">
                        {events && events.length ? <div className="h-[90%] w-[90%] grid grid-cols-4 auto-rows-max overflow-y-auto">{events.map((event) => <EventDisplay event={event} admin={admin}  delEvent={delEvent}/>)}</div> : <div className="text-5xl text-white">No Events Scheduled</div>}
                    </div>
                </div>
            </div>
            {createPopUpOpen ? <CreatePopUp popUpFalse={createPopUpFalse} id={conf.id}/> : <></>}
        </div>
    )
}

const EventDisplay = (props) => {
    return (
        <div className="flex mb-4 bg-black rounded-lg border border-white p-4 m-2">
            <div className="text-gray-300 w-[85%]">
                <p>Name: {props.event.name}</p>
                <p>Date: {props.event.time}</p>
                <p>Location: {props.event.location}</p>
            </div>
            <div className="h-full w-[15%] flex flex-col justify-between">
                {props.admin ? <button onClick={(e) => props.delEvent(props.event.id)} className="bg-red-600 w-full flex justify-center items-center">
                    <p className="text-xs">Delete</p>
                </button> : <></>}
            </div>
        </div>
    )
}

const CreatePopUp = (props) => {
    const nameRef = useRef();
    const timeRef = useRef();
    const locationRef = useRef();

    async function handleSubmit(e) {
        e.preventDefault();
        await createEvent(props.id, nameRef.current.value, timeRef.current.value, locationRef.current.value);
        props.popUpFalse(false);
        toast.success('You\'ve created an event successfully');
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
                            <label htmlFor="Name">Event Name</label>
                            <input ref={nameRef} placeholder="Event name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Date">Event Time</label>
                            <input ref={timeRef} type="time" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Location">Event Location</label>
                            <input ref={locationRef} placeholder="Event location" />
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

export default Events;