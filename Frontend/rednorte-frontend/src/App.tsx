import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { PatientListView } from './views/PatientListView';
import { MedicoListView } from './views/MedicoListView';
import { CitaListView } from './views/CitaListView'; 

function App() {
  return (
    <Router>
      <div style={appContainer}>
        {/* BARRA DE NAVEGACIÓN GLOBAL */}
        <nav style={navStyle}>
          <div style={brandStyle}>RedNorte</div>
          <div>
            <Link style={linkStyle} to="/pacientes">Pacientes</Link>
            <Link style={linkStyle} to="/medicos">Médicos</Link>
            {/* 2. AGREGAR el enlace para navegar a Citas */}
            <Link style={linkStyle} to="/citas">Citas</Link>
          </div>
        </nav>

        {/* ÁREA DE CONTENIDO VARIABLE */}
        <main style={mainContentStyle}>
          <Routes>
            <Route path="/pacientes" element={<PatientListView />} />
            <Route path="/medicos" element={<MedicoListView />} />
            
            {/* 3. REGISTRAR la ruta del microservicio de Citas */}
            <Route path="/citas" element={<CitaListView />} />
            
            <Route path="/" element={<Navigate to="/pacientes" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// --- ESTILOS PERSONALIZADOS ---
const appContainer = {
  fontFamily: 'Arial, sans-serif',
  minHeight: '100vh',
  backgroundColor: '#f4f7f62c' // Un gris muy suave de fondo para que resalten las tablas
};

const navStyle = { 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center',
  padding: '15px 40px', 
  background: '#ffffff44', 
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  borderTop: '4px solid #cc2323' // El toque rojo de RedNorte arriba
};

const brandStyle = { fontWeight: 'bold', fontSize: '1.2rem', color: '#ffffff' };
const linkStyle = { marginLeft: '20px', textDecoration: 'none', color: '#ffffff', transition: '0.3s' };
const mainContentStyle = { padding: '30px' };

export default App;