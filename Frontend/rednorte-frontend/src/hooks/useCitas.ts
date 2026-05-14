import { useState, useEffect } from 'react';
import api from '../api';
import { type Cita } from '../models/Cita';

export const useCitas = () => {
    const [citas, setCitas] = useState<Cita[]>([]);
    const [loading, setLoading] = useState(true);


    const listarTodas = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/citas')
            setCitas(res.data);
        } catch (err) {
            console.error("Error al listar", err);
        } finally {
            setLoading(false);
        }
    };

    const crearCita = async (nuevaCita: Omit<Cita, 'id'>) => {
        try {
            await api.post('/api/citas', nuevaCita)
            listarTodas();
        } catch (err) {
            console.error("Error al crear", err);
        }
    };

    const buscarPorId = async (id: number) => {
        if (!id) {
            listarTodas();
            return;
        }
        setLoading(true);
        try {
            const res = await api.get(`/api/citas/${id}`)
            setCitas(res.data ? [res.data] : []);
        } catch (err) {
            console.error("Cita no encontrada", err);
            setCitas([]);
        } finally {
            setLoading(false);
        }
    };

    // --- NUEVA FUNCIÓN PARA ELIMINAR ---
    const eliminarCita = async (id: number) => {
        try {
            // Llamada al endpoint DELETE que creaste en tu CitaController
            await api.delete(`/api/citas/${id}`)
            
            // Pattern: Filtramos el estado local para que la UI se actualice al instante
            // sin tener que llamar a listarTodas() y recargar todo de MySQL
            setCitas(prev => prev.filter(c => c.id !== id));
            
            console.log(`Cita ${id} eliminada correctamente de la base de datos.`);
        } catch (err) {
            console.error("Error al eliminar la cita", err);
            alert("No se pudo eliminar la cita.");
        }
    };

    useEffect(() => { listarTodas(); }, []);

    // Agregamos eliminarCita al return para que la Vista pueda usarla
    return { citas, loading, crearCita, listarTodas, buscarPorId, eliminarCita };
};