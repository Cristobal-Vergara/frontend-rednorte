// src/models/Medico.ts

export type Medico = {
    id: number;          // Coincide con Long en Java
    nombre: string;      // Coincide con String nombre
    apellido: string;    // Coincide con String apellido
    especialidad: string; // Coincide con String especialidad
    email?: string;      // El "?" significa que es opcional (por si en Java no siempre viene)
    rut?: string;        // Opcional, según tu controlador de Java
};