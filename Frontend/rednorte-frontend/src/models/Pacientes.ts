// src/models/Pacientes.ts
export type Paciente = {
    id: number;       // Long en Java
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    rut: string;      // ¡Importante para tu búsqueda!
}