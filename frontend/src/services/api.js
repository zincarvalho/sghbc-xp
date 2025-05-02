import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    // The baseURL will be handled by the Vite proxy during development
    // In production, this might need to be set to the actual backend URL
    baseURL: '/', // Using '/' relies on the proxy or same-origin deployment
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authToken'); // Or however the token is stored
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
            // If no token is found, clear the Authorization header
            delete config.headers['Authorization'];
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Optional: Add a response interceptor to handle common errors like 401
api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access, e.g., redirect to login
            console.error("Unauthorized access - 401");
            // Potentially clear token and redirect
            localStorage.removeItem('authToken');
            window.location.href = '/login'; // Force redirect
        }
        // Handle other errors as needed
        return Promise.reject(error);
    }
);

export default api;

