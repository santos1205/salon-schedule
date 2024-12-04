/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const ClientForm = ({ selectedClient, clearSelection }) => {
  const { addClient, updateClient } = useAppContext();

  // Initial form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Populate form if editing an existing client
  useEffect(() => {
    if (selectedClient) {
      setFormData({
        name: selectedClient.name,
        email: selectedClient.email,
        phone: selectedClient.phone,
      });
    } else {
      setFormData({ name: "", email: "", phone: "" });
    }
  }, [selectedClient]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedClient) {
      // Update existing client
      updateClient(selectedClient.id, formData);
    } else {
      // Add new client
      addClient(formData);
    }
    setFormData({ name: "", email: "", phone: "" });
    clearSelection?.(); // Reset selected client
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedClient ? "Edit Client" : "Registro de Cliente"}</h2>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <button type="submit">
        {selectedClient ? "Atualizar Cliente" : "Novo Cliente"}
      </button>
      {selectedClient && (
        <button type="button" onClick={clearSelection}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default ClientForm;
