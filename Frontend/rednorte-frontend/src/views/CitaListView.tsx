import React, { useState } from 'react';
import { useCitas } from '../hooks/useCitas';
import { GenericTable } from 'rednorte-npm';
import { type Cita } from '../models/Cita';

export const CitaListView = () => {
    // 1. Extraemos todas las funciones necesarias de nuestro Custom Hook
    const { citas, loading, buscarPorId, crearCita, listarTodas, eliminarCita } = useCitas();
    
    const [idBusqueda, setIdBusqueda] = useState("");

    // 2. Estado local para el formulario de agendamiento
    const [nueva, setNueva] = useState({ 
        pacienteId: 0, 
        medicoId: 0, 
        fechaHora: "", 
        motivo: "", 
        estado: "PENDIENTE" 
    });

    // Manejador para crear una nueva cita
    const handleCrear = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (nueva.pacienteId === 0 || nueva.medicoId === 0 || nueva.fechaHora === "") {
            alert("Por favor, completa los campos obligatorios (IDs y Fecha)");
            return;
        }

        await crearCita(nueva);
        
        // Limpiamos el formulario tras la persistencia en MySQL
        setNueva({ pacienteId: 0, medicoId: 0, fechaHora: "", motivo: "", estado: "PENDIENTE" });
    };

    if (loading) return <p style={{ color: '#ad3535', fontWeight: 'bold' }}>Cargando agenda de RedNorte...</p>;

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ color: '#ffffff' }}>Gestión de Citas Médicas</h2>

            {/* --- SECCIÓN: AGENDAR NUEVA CITA --- */}
            <section style={sectionStyle}>
                <h3 style={{ marginTop: 0 }}>Agendar Nueva Cita</h3>
                <form onSubmit={handleCrear} style={formStyle}>
                    <input 
                        type="number" 
                        placeholder="ID Paciente" 
                        style={inputStyle}
                        value={nueva.pacienteId || ""} 
                        onChange={e => setNueva({...nueva, pacienteId: Number(e.target.value)})} 
                    />
                    <input 
                        type="number" 
                        placeholder="ID Médico" 
                        style={inputStyle}
                        value={nueva.medicoId || ""} 
                        onChange={e => setNueva({...nueva, medicoId: Number(e.target.value)})} 
                    />
                    <input 
                        type="datetime-local" 
                        style={inputStyle}
                        value={nueva.fechaHora} 
                        onChange={e => setNueva({...nueva, fechaHora: e.target.value})} 
                    />
                    <input 
                        placeholder="Motivo de la consulta" 
                        style={inputStyle}
                        value={nueva.motivo} 
                        onChange={e => setNueva({...nueva, motivo: e.target.value})} 
                    />
                    <button type="submit" style={btnPrincipalStyle}>
                        Agendar Cita
                    </button>
                </form>
            </section>

            {/* --- SECCIÓN: FILTROS Y BÚSQUEDA --- */}
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <input 
                    type="number" 
                    placeholder="Buscar por ID de cita..." 
                    style={inputStyle}
                    value={idBusqueda}
                    onChange={(e) => setIdBusqueda(e.target.value)}
                />
                <button onClick={() => buscarPorId(Number(idBusqueda))} style={btnSecundarioStyle}>
                    Buscar
                </button>
                <button onClick={listarTodas} style={btnSecundarioStyle}>
                    Ver Todas
                </button>
            </div>

            {/* --- TABLA DE RESULTADOS (MODULO NPM) --- */}
            <GenericTable headers={['ID', 'Paciente ID', 'Médico ID', 'Fecha/Hora', 'Motivo', 'Estado', 'Acciones']}>
                {citas.length > 0 ? citas.map((c: Cita) => (
                    <tr key={c.id}>
                        <td style={tdStyle}>{c.id}</td>
                        <td style={tdStyle}>{c.pacienteId}</td>
                        <td style={tdStyle}>{c.medicoId}</td>
                        <td style={tdStyle}>{new Date(c.fechaHora).toLocaleString()}</td>
                        <td style={tdStyle}>{c.motivo}</td>
                        <td style={tdStyle}>
                            <span style={{ 
                                color: c.estado === 'PENDIENTE' ? '#ffcc00' : '#00ff00',
                                fontWeight: 'bold' 
                            }}>
                                {c.estado}
                            </span>
                        </td>
                        <td style={tdStyle}>
                            <button 
                                onClick={() => {
                                    if(window.confirm(`¿Seguro que desea eliminar la cita ${c.id}?`)) {
                                        eliminarCita(c.id);
                                    }
                                }}
                                style={btnEliminarStyle}
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan={7} style={{...tdStyle, textAlign: 'center'}}>
                            No se encontraron registros en MySQL.
                        </td>
                    </tr>
                )}
            </GenericTable>
        </div>
    );
};

// --- ESTILOS EN LÍNEA PARA MANTENER LA IDENTIDAD DE REDNORTE ---

const sectionStyle: React.CSSProperties = {
    marginBottom: '30px', 
    padding: '20px', 
    backgroundColor: '#f9f9f9', 
    borderRadius: '8px',
    borderLeft: '5px solid #ad3535'
};

const formStyle: React.CSSProperties = {
    display: 'flex', 
    gap: '10px', 
    flexWrap: 'wrap'
};

const inputStyle: React.CSSProperties = {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc'
};

const btnPrincipalStyle: React.CSSProperties = {
    backgroundColor: '#ad3535', 
    color: 'white', 
    border: 'none', 
    padding: '8px 16px', 
    borderRadius: '4px', 
    cursor: 'pointer',
    fontWeight: 'bold'
};

const btnSecundarioStyle: React.CSSProperties = {
    backgroundColor: '#333', 
    color: 'white', 
    border: 'none', 
    padding: '8px 16px', 
    borderRadius: '4px', 
    cursor: 'pointer'
};

const btnEliminarStyle: React.CSSProperties = {
    backgroundColor: 'transparent', 
    color: '#ad3535', 
    border: '1px solid #ad3535',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.85em'
};

const tdStyle: React.CSSProperties = { 
    padding: '12px 8px', 
    borderBottom: '1px solid #eee' 
};