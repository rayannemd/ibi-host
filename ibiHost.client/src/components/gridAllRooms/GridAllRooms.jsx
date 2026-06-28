import { useState, useEffect } from 'react';
import { IoBedOutline } from "react-icons/io5";
import './GridAllRooms.css';

/**
 
 * @param {string} status -
 * @returns {{className: string}} 
 */
const getStatusInfo = (status) => {
    switch (status?.toUpperCase()) {
        case 'LIVRE':
            return { className: 'status-livre' };
        case 'RESERVADO':
            return { className: 'status-reservado' };
        case 'OCUPADO':
            return { className: 'status-ocupado' };
        default:
            return { className: 'status-desconhecido' };
    }
};


const RoomCard = ({ room }) => {
    const { className } = getStatusInfo(room.status);

    return (
        <div className="room-card">
            <span className={`status-dot ${className}`}></span>
            
            <div className="room-status-icon">
                <IoBedOutline />
            </div>
            <p className="room-number">Quarto {room.numero}</p>
        </div>
    );
};


function GridAllRooms() {

    const [rooms, setRooms] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

   
    useEffect(() => {
        const fetchAllRoomsStatus = async () => {
            try {
                const today = new Date().toISOString().split('T')[0];
                const token = sessionStorage.getItem("token");
                
                const response = await fetch('http://localhost:8080/api/status-quartos', {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        dataCheckin: today,
                        dias: 0
                    }),
                });
                
                if (!response.ok) {
                    throw new Error(`Não foi possível carregar os dados. Status: ${response.status}`);
                }

                
                const data = await response.json();
                setRooms(data);

            } catch (err) {
                console.error("Erro ao buscar status dos quartos:", err);
                setError("Ocorreu um erro ao buscar os dados. Verifique a conexão com o servidor e tente novamente.");
            } finally {
               
                setLoading(false);
            }
        };

        fetchAllRoomsStatus();
    }, []);

    if (loading) {
        return <div className="feedback-message">Carregando status dos quartos...</div>;
    }

    if (error) {
        return <div className="feedback-message error">{error}</div>;
    }

    return (
        <div className="grid-page-container">
            <h1>Status de Todos os Quartos</h1>

            <div className="legend-container">
                <div className="legend-item"><span className="color-box status-livre"></span> Livre</div>
                <div className="legend-item"><span className="color-box status-reservado"></span> Reservado</div>
                <div className="legend-item"><span className="color-box status-ocupado"></span> Ocupado</div>
            </div>

            <div className="rooms-grid-container">
                {rooms.map(room => (
                    <RoomCard key={room.numero} room={room} />
                ))}
            </div>
        </div>
    );
}

export default GridAllRooms;