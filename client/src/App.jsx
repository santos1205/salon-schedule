import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ClientsPage from "./pages/ClientsPage";
import "./App.css";

// ### GPT references
// Steps to Use Another RPC Provider

function App() {
  return (

    <div className="container">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/clients">Clients</Link>
              </li>
              {/* <li>
                <Link to="/appointments">Appointments</Link>
              </li> */}
            </ul>
          </nav>

          <Routes>
            <Route
              path="/"
              element={<h1>Bem-vindo ao aplicativo agenda</h1>}
            />
            <Route path="/clients" element={<ClientsPage />} />
            {/* <Route path="/appointments" element={<AppointmentsPage />} /> */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
