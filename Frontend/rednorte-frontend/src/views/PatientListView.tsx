import { useState } from 'react';
import { usePacientes } from '../hooks/usePacientes';
import { GenericTable } from 'rednorte-npm';
import { type Paciente } from '../models/Pacientes';

export const PatientListView = () => {
  // 1. Extraemos crearPaciente del hook
  const { pacientes, loading, eliminarPaciente, buscarPorId, listarTodos, crearPaciente } = usePacientes();
  const [idBusqueda, setIdBusqueda] = useState("");
  
  // 2. Estado para el nuevo paciente
  const [nuevo, setNuevo] = useState({ rut: '', nombre: '', apellido: '', email: '', telefono: '' });

  const handleCrear = (e: React.FormEvent) => {
    e.preventDefault();
    crearPaciente(nuevo as Paciente);
    setNuevo({ rut: '', nombre: '', apellido: '', email: '', telefono: '' }); // Limpiar
  };

  if (loading) return <p>Cargando sistema RedNorte...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestión de Pacientes</h2>

      {/* --- FORMULARIO PARA CREAR --- */}
      <div style={formContainerStyle}>
        <h3>Registrar Nuevo Paciente</h3>
        <form onSubmit={handleCrear}>
          <input placeholder="RUT" value={nuevo.rut} onChange={e => setNuevo({...nuevo, rut: e.target.value})} required style={inputStyle}/>
          <input placeholder="Nombre" value={nuevo.nombre} onChange={e => setNuevo({...nuevo, nombre: e.target.value})} required style={inputStyle}/>
          <input placeholder="Apellido" value={nuevo.apellido} onChange={e => setNuevo({...nuevo, apellido: e.target.value})} required style={inputStyle}/>
          <input placeholder="Email" value={nuevo.email} onChange={e => setNuevo({...nuevo, email: e.target.value})} required style={inputStyle}/>
          <button type="submit" style={btnSuccessStyle}>Guardar Paciente</button>
        </form>
      </div>

      <hr />

      {/* Buscador por ID */}
      <div style={{ marginBottom: '20px', marginTop: '20px' }}>
        <input 
          type="number" 
          placeholder="Buscar por ID..." 
          value={idBusqueda}
          onChange={(e) => setIdBusqueda(e.target.value)}
          style={inputStyle}
        />
        <button onClick={() => buscarPorId(Number(idBusqueda))}>Buscar ID</button>
        <button onClick={listarTodos} style={{ marginLeft: '10px' }}>Mostrar Todos</button>
      </div>

      <GenericTable headers={['ID', 'RUT', 'Nombre', 'Email', 'Acciones']}>
        {pacientes.map((p: Paciente) => (
          <tr key={p.id}>
            <td style={tdStyle}>{p.id}</td>
            <td style={tdStyle}>{p.rut}</td>
            <td style={tdStyle}>{p.nombre} {p.apellido}</td>
            <td style={tdStyle}>{p.email}</td>
            <td style={tdStyle}>
              <button 
                onClick={() => eliminarPaciente(p.id!)}
                style={btnDeleteStyle}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </GenericTable>
    </div>
  );
};

// Estilos rápidos
const inputStyle = { padding: '8px', marginRight: '5px', marginBottom: '5px' };
const formContainerStyle = { background: '#f4f4f400', padding: '15px', borderRadius: '8px', border: '1px solid #cccccc00' };
const btnSuccessStyle = { padding: '8px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' };
const btnDeleteStyle = { backgroundColor: 'red', color: 'white', border: 'none', padding: '5px', cursor: 'pointer' };
const tdStyle = { padding: '8px', border: '1px solid #dddddd00' };