// ConferenceContext.js
import React, { createContext, useContext, useState } from "react";

const ConferenceContext = createContext();

export const ConferenceProvider = ({ children }) => {
  const [createdConferences, setCreatedConferences] = useState([]);
  const [attendedConferences, setAttendedConferences] = useState([]);

  const addCreatedConference = (conferenceData) => {
    setCreatedConferences([...createdConferences, conferenceData]);
  };

  const addAttendedConference = (attendedConference) => {
    setAttendedConferences([...attendedConferences, attendedConference]);
  };

  return (
    <ConferenceContext.Provider
      value={{ createdConferences, attendedConferences, addCreatedConference, addAttendedConference }}
    >
      {children}
    </ConferenceContext.Provider>
  );
};

export const useConferenceContext = () => {
  const context = useContext(ConferenceContext);
  if (!context) {
    throw new Error("useConferenceContext must be used within a ConferenceProvider");
  }
  return context;
};
