import React from 'react';
import { useAuth } from '../context/AuthContext';

function HomePage() {
    const { user, logout } = useAuth();

    return (
        <div>
            <h1>Bem-vindo ao SGHBC-XP</h1>
        
            {/* Conteúdo principal da aplicação virá aqui */}
        </div>
    );
}

export default HomePage;
