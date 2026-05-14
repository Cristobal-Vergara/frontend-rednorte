export interface Cita {
    id: number;
    pacienteId: number;
    medicoId: number;
    fechaHora: string; // El LocalDateTime de Java llega como String ISO
    motivo: string;
    estado: string;
}