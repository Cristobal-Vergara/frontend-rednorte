import { useState, useEffect } from 'react';
import api from '../api';
import { type Medico } from '../models/Medicos';

export const useMedicos = () => {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [loading, setLoading] = useState(false);

  // 1. LISTAR TODOS
  const listarTodos = async () => {
    setLoading(true);

    try {
      const res = await api.get('/api/medicos');
      setMedicos(res.data);
    } catch (err) {
      console.error("Error al listar médicos", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. BUSCAR POR ID
  const buscarPorId = async (id: number) => {
    if (!id) {
      listarTodos();
      return;
    }

    setLoading(true);

    try {
      const res = await api.get(`/api/medicos/${id}`);
      setMedicos(res.data ? [res.data] : []);
    } catch (err) {
      console.error("Médico no encontrado", err);
      alert("Médico no encontrado con ese ID");
      setMedicos([]);
    } finally {
      setLoading(false);
    }
  };

  // 3. CREAR
  const crearMedico = async (nuevo: Omit<Medico, 'id'>) => {
    try {
      await api.post('/api/medicos', nuevo);

      alert("Médico registrado con éxito");

      listarTodos();
    } catch (err) {
      console.error("Error al crear médico", err);
      alert("Error al registrar médico");
    }
  };

  // 4. ELIMINAR
  const eliminarMedico = async (id: number) => {
    if (!window.confirm("¿Estás seguro de eliminar a este médico?")) return;

    try {
      await api.delete(`/api/medicos/${id}`);

      setMedicos(prev => prev.filter(m => m.id !== id));

      alert("Médico eliminado correctamente");
    } catch (err) {
      console.error("Error al eliminar médico", err);
      alert("No se pudo eliminar el médico");
    }
  };

  useEffect(() => {
    listarTodos();
  }, []);

  return {
    medicos,
    loading,
    buscarPorId,
    crearMedico,
    eliminarMedico,
    listarTodos
  };
};