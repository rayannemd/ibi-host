import { useState } from 'react';
import { PiBedThin } from "react-icons/pi";
import { MdArrowDropDown } from "react-icons/md";
import './RoomSelector.css';


const getStatusClass = (status) => {
    switch (status?.toUpperCase()) {
        case 'LIVRE': return 'status-livre';
        case 'RESERVADO': return 'status-reservado';
        case 'OCUPADO': return 'status-ocupado';
        default: return 'status-desconhecido';
    }
};

const RoomSelector = ({ rooms, selectedRoom, onRoomSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const selectedRoomObject = rooms.find(room => room.numero === selectedRoom);

    const handleSelect = (numero) => {
        onRoomSelect(numero);
        setIsOpen(false);
    };

    return (
        <div className="room-selector-container">
            <div className="inputGroup"> 
                <div className="inputWrapper" onClick={() => setIsOpen(!isOpen)}>
                    <span className="icon"><PiBedThin /></span>
                    <div className="selected-value">
                        {selectedRoomObject ? `Quarto ${selectedRoomObject.numero}` : "Selecione um quarto"}
                    </div>
                    <span className="dropdown-arrow-icon">
                        <MdArrowDropDown />
                    </span>
                </div>
            </div>

            {isOpen && (
                <ul className="room-options-list">
                    {rooms.map((room) => (
                        <li 
                            key={room.numero} 
                            onClick={() => handleSelect(room.numero)}
                            className={room.numero === selectedRoom ? 'selected' : ''}
                        >
                            <span className={`status-dot ${getStatusClass(room.status)}`}></span>
                            Quarto {room.numero}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};


export default RoomSelector;