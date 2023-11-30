import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { attendConference } from "../utils/Firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AttendConferenceForm = () => {
    const [conferenceCode, setConferenceCode] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value;
        setConferenceCode(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // You can handle the form submission logic here
        const result = await attendConference(conferenceCode);
        if(result === -1) {
            toast.error("This conference does not exist");
        }
        else if(result === 0) {
            toast.info("You are already attending this conference");
        }
        else if(result === 1) {
            toast.success("You are now attending this conference");
            setTimeout(() => {
                window.location.href = "home";
              }, 3000);
        }
    };

    return (
        <div className='max-h-screen overflow-y-hidden'>
            <Navbar />
            <ToastContainer />
            <div className="attend-conference-container overflow-y-hidden bg-base-200">
                <div className="black-and-white-form">
                    <h2 div className="text-center font-bold">Attend Conference</h2>
                    <form onSubmit={handleSubmit}>
                        {/*<div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="first name"
                                value={attendeeData.firstName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="last name"
                                value={attendeeData.lastName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="email address"
                                value={attendeeData.email}
                                onChange={handleInputChange}
                            />
                        </div>*/}
                        <div className="form-group">
                            <label htmlFor="conferenceCode">Conference Code</label>
                            <input
                                type="text"
                                id="conferenceCode"
                                name="conferenceCode"
                                placeholder="conference code"
                                value={conferenceCode}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group rounded-button-container font-bold">
                            <button className="hover:bg-black hover:text-white transition-all duration-300" type="submit">Attend</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AttendConferenceForm;
