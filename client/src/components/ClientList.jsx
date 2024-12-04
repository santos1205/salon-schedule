import { useAppContext } from "../context/AppContext";

export default function ClientList() {
  const { clients, deleteClient } = useAppContext();

  return (
    <div className="client-grid">
      {clients.length === 0 ? (
        <p>Nenhum cliente cadastrado.</p>
      ) : (
        clients.map((client) => (
          <div key={client.id} className="client-card">
            <h3>{client.name}</h3>
            <p>{client.phone}</p>
            <p className="email">{client.email}</p>
            <div className="client-actions">
              {/* <button className="edit-btn" onClick={() => onEdit(client.id)}>
                Edit
              </button> */}
              <button
                className="delete-btn"
                onClick={() => deleteClient(client.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}