/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // ### CLIENT CRUD OPERATIONS
  function addClient(client) {
    setClients([...clients, client]);
  }

  function updateClient(id, updatedData) {
    setClients(
      clients.map((client) =>
        client.id === id ? { ...client, ...updatedData } : client
      )
    );
  }

  function deleteClient(id) {
    setClients(clients.filter((client) => client.id !== id));
    // remove associated appointments
    setAppointments(appointments.filter((appt) => appt.clientId !== id));
  }

  // ### CLIENT CRUD OPERATIONS
  function addAppointment(appointment) {
    setAppointments([...appointments, appointment]);
  }

  function removeAppointment(id) {
    setAppointments(appointments.filter((appt) => appt.id !== id));
  }

  // all methods above is attributed to value and then, sent to provider
  const value = {
    clients,
    addClient,
    updateClient,
    deleteClient,
    appointments,
    addAppointment,
    removeAppointment,
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext);