import React from 'react';
import MenuLeft from '../../components/menuLeftComponent/MenuLeft';
import { useNavigate, useLocation } from 'react-router-dom';
import './CheckInSuccess.css';

function CheckInSuccess() {
    const navigate = useNavigate();
    const location = useLocation();

    const guestData = location.state?.guest || { nome: "Hóspede Exemplo", telefone: "999999999" };
   
     const handleSendSimulation = async () => {
        const token = sessionStorage.getItem("token");

        const send = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/enviarEmail` , {
            method: "POST" , 
            headers: {
              "Content-Type": "application/json" ,
              "Authorization": `Bearer ${token}` 
            } , 
            body: JSON.stringify({cpf: guestData.cpf , operacao:"checkin"})
          });
          alert("Email enviado com sucesso!");
          navigate("/menu");
    };

    
    return (
        <div className="containerCheckSuccess">
            <div className="menuLeftCheckSuccess"> 
                <MenuLeft />
            </div>
            <div className="contentCheckSuccess"> 
                <div className="messageBox"> 
                    <h1 className="title">Check-in</h1>
                    <p className="message">Check-in realizado com sucesso!</p>
                    <p className="prompt">Enviar confirmação para e-mail do Hóspede?</p>
                    <button 
                        className="buttonAction" 
                        onClick={handleSendSimulation}
                    >
                        ENVIAR
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CheckInSuccess;