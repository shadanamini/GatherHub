import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { attendConference } from "../utils/Firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AttendConferenceForm = () => {
    const [attendeeData, setAttendeeData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        conferenceName: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAttendeeData({
            ...attendeeData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // You can handle the form submission logic here
        const result = await attendConference(attendeeData.conferenceName);
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
                        <div className="form-group">
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
                        </div>
                        <div className="form-group">
                            <label htmlFor="conferenceName">Conference Name</label>
                            <input
                                type="text"
                                id="conferenceName"
                                name="conferenceName"
                                placeholder="conference name"
                                value={attendeeData.conferenceName}
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
