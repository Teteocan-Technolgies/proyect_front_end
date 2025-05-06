import axios from "axios";
import { useAuthStore } from "../stores/auth";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    //"Accept" : 'aplication/json'
  },
});


//Interceptor para añadir token de autenticación
api.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
}); 

//Interceptor para manejar respuestas exitosas
api.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        const authStore = useAuthStore();
        authStore.logout();
        // Redirigir al usuario a la página de inicio de sesión
      }
      return Promise.reject(error.response?.dat || error);
    }
)

//Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Manejar el error de autenticación aquí
      console.error("Error de autenticación:", error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;