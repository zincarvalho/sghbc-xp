import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext'; // Corrected path

/**
 * Custom hook for fetching and managing a list of entities with search functionality.
 * 
 * @param {string} entityName - The base path for the entity API (e.g., '/pacientes', '/medicos').
 * @param {string} searchParamName - The query parameter name for search (e.g., 'termo', 'nome'). Defaults to 'termo'.
 * @returns {object} - { data, loading, error, searchTerm, setSearchTerm, refetch }
 */
function useEntityList(entityName, searchParamName = 'termo') {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { apiClient } = useAuth();

    const fetchData = useCallback(async (term = '') => {
        setLoading(true);
        setError('');
        try {
            const endpoint = term
                ? `${entityName}/search?${searchParamName}=${encodeURIComponent(term)}`
                : entityName;
            const response = await apiClient.get(endpoint);
            setData(response.data);
        } catch (err) {
            console.error(`Erro ao buscar ${entityName}:`, err);
            const errorMsg = err.response?.data?.message || `Falha ao carregar ${entityName}. Tente novamente mais tarde.`;
            setError(errorMsg);
            setData([]); // Clear data on error
        } finally {
            setLoading(false);
        }
    }, [apiClient, entityName, searchParamName]);

    // Initial fetch
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Function to trigger refetch, optionally with a new search term
    const refetch = (newSearchTerm) => {
        const termToUse = typeof newSearchTerm === 'string' ? newSearchTerm : searchTerm;
        fetchData(termToUse);
    };

    // Debounced search or direct search on submit can be handled in the component using this hook
    // This hook provides the basic fetch logic based on searchTerm

    return { data, loading, error, searchTerm, setSearchTerm, refetch, fetchData };
}

export default useEntityList;

