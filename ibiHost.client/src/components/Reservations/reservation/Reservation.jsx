import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MenuLeft from "../../menuLeftComponent/MenuLeft";
import FormComponent from "../../formComponent/FormComponent";
import RoomSelector from "../roomSelector/RoomSelector";
import { PiBedThin } from "react-icons/pi";
import { LuCalendarCheck2 } from "react-icons/lu";
import { BsPeople } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa";
import { GoAlert } from "react-icons/go";

import "../../../Pages/checkGuests/CheckGuests.css";

function Reservation() {
  const navigate = useNavigate();
  const location = useLocation();
  const cliente = location.state?.cliente;

  // Estados para os campos de verificação
  const [qtdDias, setQtdDias] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [statusQuartos, setStatusQuartos] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");

  // Enviar reserva
  const handleSubmit = async (e) => {
    e.preventDefault();
    const numero = selectedRoom;
    const dataCheckin = e.target.checkIn.value;
    const checkInDate = new Date(dataCheckin);

    if (isNaN(qtdDias) || qtdDias <= 0) {
      alert("A quantidade de dias precisa ser maior que zero.");
      return;
    }

    checkInDate.setDate(checkInDate.getDate() + parseInt(qtdDias));

    const dataCheckout = checkInDate.toISOString().split('T')[0];

    const qtdPessoas = parseInt(e.target.people.value);
    const valorReserva = parseFloat(e.target.value.value);

    const clientePayLoad = { cpf: cliente.cpf };

    if(qtdPessoas<=0 || valorReserva<=0){
      alert("Quantidade de pessoas, quantidade de dias e o valor da reserva não podem ser números menores que 0!");
      return;
    }

    console.log(JSON.stringify({quarto: { numero: numero },
          dataCheckin,
          dataCheckout,
          qtdPessoas,
          valorReserva,
          cliente: clientePayLoad}));
      
    try {
      const token = sessionStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/cadastrarReserva`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          quarto: { numero: numero },
          dataCheckin,
          dataCheckout,
          qtdPessoas,
          valorReserva,
          cliente: clientePayLoad
        }),
      });

      if (response.status === 201) {
        const send = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/enviarEmail` , {
          method: "POST" , 
          headers: {
            "Content-Type": "application/json" , 
            "Authorization": `Bearer ${token}`
          } , 
          body: JSON.stringify({cpf: cliente.cpf , operacao:"reserva"})
        });
        alert("Email enviado com sucesso!");
        navigate("/menu");
      } else {
        alert("Ocorreu um erro :(");
      }
    } catch (error) {
      console.error("Erro", error);
      alert("Erro na requisição!");
    }
  };

  // Verificar disponibilidade
  const handleVerificarDisponibilidade = async () => {
    if (!checkIn || !qtdDias) {
      alert("Preencha a data de entrada e a quantidade de dias.");
      return;
    }

    if (parseInt(qtdDias) <= 0) {
      alert("A quantidade de dias deve ser maior que zero.");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/status-quartos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`

        },
        body: JSON.stringify({
          dataCheckin: checkIn,
          dias: parseInt(qtdDias),
        }),
      });

      const data = await response.json();
      console.log("Status dos quartos:", data);
      setStatusQuartos(data);
    } catch (error) {
      console.error("Erro ao verificar disponibilidade:", error);
    }
  };

  return (
    <div className="containerCheckGuests">
      <div className="menuLeftCheckGuests">
        <MenuLeft />
      </div>
      <div className="containerFormCheckGuests">
        <p><strong>Nome: {cliente.nome}</strong></p>
        <p><strong>CPF: {cliente.cpf}</strong></p>

        <form onSubmit={handleSubmit}>
          <FormComponent
            icon={<LuCalendarCheck2 />}
            type="date"
            placeholder="Data de Entrada"
            name="checkIn"
            id="checkIn"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />

          {/* CAMPO NOVO: Quantidade de Dias */}
          <div className="inputGroupHorizontal" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FormComponent
              icon={<GoAlert />}
              type="number"
              placeholder="Qtd Dias"
              name="qtdDias"
              id="qtdDias"
              value={qtdDias}
              min={1}
              onChange={(e) => setQtdDias(e.target.value)}
            />

            <button
              type="button"
              className="buttonInput"
              onClick={handleVerificarDisponibilidade}
            >
              Verificar Disponibilidade
            </button>
          </div>

          <RoomSelector
            rooms={statusQuartos}
            selectedRoom={selectedRoom}
            onRoomSelect={(roomNumber) => setSelectedRoom(roomNumber)}
          />

          <FormComponent
            icon={<BsPeople />}
            type="number"
            placeholder="Nº de pessoas"
            name="people"
            id="people"
            min={1}
          />
          <FormComponent
            icon={<FaDollarSign />}
            type="number"
            placeholder="Valor"
            name="value"
            id="value"
            min={1}
          />

          <button type="submit" className="buttonInput">RESERVAR</button>
        </form>
      </div>
    </div>
  );
}

export default Reservation;
