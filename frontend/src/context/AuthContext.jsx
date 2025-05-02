import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [loading, setLoading] = useState(true); // Add loading state

    // Axios instance for API calls
    const apiClient = axios.create({
       
        baseURL: 'http://localhost:8081', // Adjust baseURL if your backend runs elsewhere
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Include current token
            
        }
    });

    // Add interceptor to include token in requests
    apiClient.interceptors.request.use(config => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    useEffect(() => {
        if (token) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser({ token }); // Simplified user object
        } else {
            delete apiClient.defaults.headers.common['Authorization'];
            setUser(null);
        }
        setLoading(false); // Set loading to false after checking token
    }, [token]);

    const login = async (username, password) => {
        try {
            const response = await apiClient.post('http://localhost:8081/api/auth/login', { username, password });
            const { token: newToken, username: loggedInUsername, roles } = response.data;
            localStorage.setItem('authToken', newToken);
            setToken(newToken);
            setUser({ username: loggedInUsername, roles }); // Store user details
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
           
            return true; // Indicate successful login
        } catch (error) {
        //    console.error("Login failed:", error);
            localStorage.removeItem('authToken');
            setToken(null);
            setUser(null);
            delete apiClient.defaults.headers.common['Authorization'];
            return false; // Indicate failed login
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        delete apiClient.defaults.headers.common['Authorization'];
        // Optionally call backend logout endpoint
        // apiClient.post('/auth/logout');
    };

    // Function to refresh token (basic example)
    const refreshToken = async () => {
        try {
            const response = await apiClient.post('/auth/refresh', { token });
            const { token: newToken } = response.data;
            localStorage.setItem('authToken', newToken);
            setToken(newToken);
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            return newToken;
        } catch (error) {
            console.error("Token refresh failed:", error);
            logout(); // Logout se refresh falhar
            return null;
        }
    };

    // Add interceptor to handle token expiration and refresh
    let isRefreshing = false; // Flag to prevent concurrent refresh calls
    let failedQueue = []; // Queue of failed requests to retry after refresh

    apiClient.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config;
            // Check if the error is due to token expiration (e.g., 401 Unauthorized)
            // and if it's not a retry request already
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true; // Mark as retry
                // If there's no refresh in progress, start one
                if (!isRefreshing) {
                    isRefreshing = true;
                    try {
                        const newToken = await refreshToken();
                        if (newToken) {
                            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                            // Retry the original request and any other failed requests
                            failedQueue.forEach(request => {
                                apiClient(request);
                            });
                            failedQueue = [];
                        }
                    } catch (refreshError) {
                        // Handle failed refresh (e.g., redirect to login)
                        logout();
                        return Promise.reject(refreshError);
                    } finally {
                        isRefreshing = false;
                    }
                } else {
                    // If there's a refresh in progress, queue the failed request
                    failedQueue.push(originalRequest);
                }
            }
            return Promise.reject(error);
        }
    );

    const value = {
        user,
        token,
        loading, // Provide loading state
        login,
        logout,
        apiClient // Provide the configured axios instance
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
