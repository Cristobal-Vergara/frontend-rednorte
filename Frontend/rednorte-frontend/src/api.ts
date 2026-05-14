import axios from 'axios';

const api = axios.create({
  // Aquí va la URL de tu Spring Boot (ajusta el puerto si es necesario)
  baseURL: 'http://localhost:8085', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;