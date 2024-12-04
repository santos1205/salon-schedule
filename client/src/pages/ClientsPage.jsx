import ClientForm from "../components/ClientForm";
import ClientList from "../components/ClientList";

const ClientsPage = () => {
  return (
    <div>
      <h1>Gestão de Clientes</h1>
      <ClientForm />
      <ClientList />
    </div>
  );
};

export default ClientsPage;
