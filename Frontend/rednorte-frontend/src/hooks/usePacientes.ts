import { useState, useEffect } from 'react';
import api from '../api';
import { type Paciente } from '../models/Pacientes';

export const usePacientes = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(false);

  // 1. LISTAR TODOS
  const listarTodos = async () => {
    setLoading(true);

    try {
      const res = await api.get('/api/pacientes');
      setPacientes(res.data);
    } catch (err) {
      console.error("Error al listar pacientes", err);
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
      const res = await api.get(`/api/pacientes/${id}`);

      setPacientes(res.data ? [res.data] : []);
    } catch (err) {
      console.error("Paciente no encontrado", err);
      alert("Paciente no encontrado");
      setPacientes([]);
    } finally {
      setLoading(false);
    }
  };

  // 3. CREAR
  const crearPaciente = async (nuevo: Omit<Paciente, 'id'>) => {
    try {
      await api.post('/api/pacientes', nuevo);

      alert("Paciente registrado correctamente");

      listarTodos();
    } catch (err) {
      console.error("Error al crear paciente", err);
      alert("No se pudo registrar el paciente");
    }
  };

  // 4. ELIMINAR
  const eliminarPaciente = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar este paciente?")) return;

    try {
      await api.delete(`/api/pacientes/${id}`);

      setPacientes(prev => prev.filter(p => p.id !== id));

      alert("Paciente eliminado correctamente");
    } catch (err) {
      console.error("Error al eliminar paciente", err);
      alert("No se pudo eliminar el paciente");
    }
  };

  useEffect(() => {
    listarTodos();
  }, []);

  return {
    pacientes,
    loading,
    listarTodos,
    buscarPorId,
    crearPaciente,
    eliminarPaciente
  };
};