import React, { createContext, useContext, useState } from "react";

const ConferenceContext = createContext();

export const ConferenceProvider = ({ children }) => {
  const [createdConferences, setCreatedConferences] = useState([]);

  const addCreatedConference = (conferenceData) => {
    setCreatedConferences([...createdConferences, conferenceData]);
  };

  return (
    <ConferenceContext.Provider
      value={{ createdConferences, addCreatedConference }}
    >
      {children}
    </ConferenceContext.Provider>
  );
};

export const useConferenceContext = () => {
  return useContext(ConferenceContext);
};
