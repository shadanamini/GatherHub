import React, { useState } from "react";
import Navbar from "../components/Navbar";

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle the form submission logic here
        console.log("Submitted data:", attendeeData);
    };

    return (
        <div className='max-h-screen'>
            <Navbar />
            <div className="attend-conference-container overflow-y-hidden">
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
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="email"
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
