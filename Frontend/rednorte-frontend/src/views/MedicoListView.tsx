import React, { useState } from 'react';
import { useMedicos } from '../hooks/useMedicos';
import { GenericTable } from 'rednorte-npm';
import { type Medico } from '../models/Medicos';

export const MedicoListView = () => {
  const { medicos, loading, buscarPorId, crearMedico, eliminarMedico, listarTodos } = useMedicos();
  const [idBusqueda, setIdBusqueda] = useState("");

  // Estado para el formulario con todos los campos requeridos
  const [nuevo, setNuevo] = useState({ 
    rut: "", 
    nombre: "", 
    apellido: "", 
    especialidad: "", 
    email: "" 
  });

  const handleCrear = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica antes de enviar al backend
    if (!nuevo.rut || !nuevo.nombre || !nuevo.apellido || !nuevo.especialidad || !nuevo.email) {
      alert("Por favor, completa todos los campos del médico.");
      return;
    }

    crearMedico(nuevo as Medico);
    
    // Limpiar el formulario tras el envío
    setNuevo({ rut: "", nombre: "", apellido: "", especialidad: "", email: "" });
  };

  if (loading) return <p style={{ padding: '20px' }}>Conectando con el servicio de Médicos...</p>;

  return (
    <div style={{ padding: '25px', fontFamily: 'Segoe UI, Roboto, sans-serif' }}>
      <h2 style={{ color: '#ffffff', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>
      Gestión de Médicos
      </h2>

      {/* --- SECCIÓN: REGISTRO --- */}
      <div style={formContainerStyle}>
        <h3 style={{ marginTop: 0, color: '#34495e' }}>Registrar Nuevo Profesional</h3>
        <form onSubmit={handleCrear} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input 
            style={inputStyle}
            placeholder="RUT (ej: 12.345.678-9)" 
            value={nuevo.rut} 
            onChange={e => setNuevo({...nuevo, rut: e.target.value})} 
          />
          <input 
            style={inputStyle}
            placeholder="Nombre" 
            value={nuevo.nombre} 
            onChange={e => setNuevo({...nuevo, nombre: e.target.value})} 
          />
          <input 
            style={inputStyle}
            placeholder="Apellido" 
            value={nuevo.apellido} 
            onChange={e => setNuevo({...nuevo, apellido: e.target.value})} 
          />
          <input 
            style={inputStyle}
            placeholder="Especialidad" 
            value={nuevo.especialidad} 
            onChange={e => setNuevo({...nuevo, especialidad: e.target.value})} 
          />
          <input 
            style={inputStyle}
            type="email"
            placeholder="Correo Electrónico" 
            value={nuevo.email} 
            onChange={e => setNuevo({...nuevo, email: e.target.value})} 
          />
          <button type="submit" style={btnSaveStyle}>Guardar Médico</button>
        </form>
      </div>

      {/* --- SECCIÓN: BÚSQUEDA --- */}
      <div style={{ marginBottom: '25px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input 
          style={{ ...inputStyle, width: '150px' }}
          type="number" 
          placeholder="Buscar por ID..." 
          value={idBusqueda}
          onChange={(e) => setIdBusqueda(e.target.value)}
        />
        <button style={btnSearchStyle} onClick={() => buscarPorId(Number(idBusqueda))}>Buscar</button>
        <button style={btnListStyle} onClick={listarTodos}>Ver Todos</button>
      </div>

      {/* --- TABLA DE RESULTADOS --- */}
      <GenericTable headers={['ID', 'RUT', 'Nombre Completo', 'Especialidad', 'Email', 'Acciones']}>
        {medicos.length > 0 ? (
          medicos.map((m: Medico) => (
            <tr key={m.id} style={{ transition: 'background 0.3s' }}>
              <td style={tdStyle}><strong>{m.id}</strong></td>
              <td style={tdStyle}>{m.rut}</td>
              <td style={tdStyle}>{m.nombre} {m.apellido}</td>
              <td style={tdStyle}>
                <span style={badgeStyle}>{m.especialidad}</span>
              </td>
              <td style={tdStyle}>{m.email}</td>
              <td style={tdStyle}>
                <button 
                  onClick={() => eliminarMedico(m.id!)} 
                  style={btnDeleteStyle}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: '#7f8c8d' }}>
              No se encontraron médicos registrados.
            </td>
          </tr>
        )}
      </GenericTable>
    </div>
  );
};

// --- OBJETOS DE ESTILO (CSS-in-JS) ---
const tdStyle = { 
  padding: '12px 15px', 
  borderBottom: '1px solid #ebedf0',
  fontSize: '14px' 
};

const formContainerStyle = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '10px',
  marginBottom: '30px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  border: '1px solid #e0e0e0'
};

const inputStyle = {
  padding: '10px 14px',
  borderRadius: '6px',
  border: '1px solid #dcdfe6',
  fontSize: '14px',
  outline: 'none',
  minWidth: '180px'
};

const badgeStyle = {
  backgroundColor: '#e1f5fe',
  color: '#0288d1',
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: 'bold' as 'bold'
};

const btnSaveStyle = {
  padding: '10px 20px',
  backgroundColor: '#27ae60',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '600' as 'bold'
};

const btnSearchStyle = {
  padding: '10px 20px',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

const btnListStyle = {
  padding: '10px 20px',
  backgroundColor: '#95a5a6',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

const btnDeleteStyle = {
  padding: '6px 12px',
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '13px'
};