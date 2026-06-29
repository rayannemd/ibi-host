import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate
import InfoCard from '../infoCard/InfoCard.jsx';
import './Dashboard.css'; // O CSS anterior continua válido para este layout

function Dashboard() {
    const navigate = useNavigate(); // Hook para controlar a navegação
    
    // Estados para os dados dinâmicos (check-ins e check-outs)
    const [checkInData, setCheckInData] = useState({ value: 0, loading: true });
    const [checkOutData, setCheckOutData] = useState({ value: 0, loading: true });
    
    useEffect(() => {
        // Função para buscar dados de um endpoint específico
        const fetchData = async (endpoint, setData) => {
            try {
                const token = sessionStorage.getItem("token");

                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error('Falha na resposta da rede');
                const data = await response.json();
                setData({ value: data, loading: false });
            } catch (error) {
                console.error(`Erro ao buscar dados de ${endpoint}:`, error);
                setData({ value: 'Error', loading: false });
            }
        };


        const checkinsEndpoint = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/proximos-checkins`;
        const checkoutsEndpoint = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/proximos-checkouts`;

        // Busca os dados
        fetchData(checkinsEndpoint, setCheckInData);
        fetchData(checkoutsEndpoint, setCheckOutData);

    }, []);


    const handleNavigateToRooms = () => {
        window.location.href = "/rooms"; 
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-grid">
                {/* O card de quartos agora é um botão de navegação */}
                <div 
                    className="grid-item-quartos clickable-card" 
                    onClick={handleNavigateToRooms}
                >
                    <InfoCard 
                        title="Ver Status dos Quartos" 
                    />
                </div>
                
                {/* Cards dinâmicos */}
                <div className="grid-item-checkins">
                    <InfoCard 
                        title="Próximos Check-ins" 
                        value={checkInData.loading ? '...' : checkInData.value} 
                    />
                </div>
                <div className="grid-item-checkouts">
                    <InfoCard 
                        title="Próximos Check-outs" 
                        value={checkOutData.loading ? '...' : checkOutData.value} 
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;