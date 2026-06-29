import ViewReservationsOfGuests from "../../components/viewReservationsGuests/ViewReservationsOfGuests";
import MenuLeft from "../../components/menuLeftComponent/MenuLeft.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import "./SelectedReservationCheckIn.css";

function SelectedReservationCheckIn() {
  const location = useLocation();
  const navigate = useNavigate();

  // Recebe as reservas da página anterior. Se não houver, usa um array vazio.
  const reservas = location.state?.reservas || [];
  console.log("Reservas recebidas para check-in:", reservas);

  const handleConfirmCheckIn = async (reservaConfirmada) => {
    const reserva = {id: reservaConfirmada.id};
    const valorCheckin = reservaConfirmada.valorReserva;
    const dataCheckin = reservaConfirmada.dataReserva;


    console.log("Simulando confirmação de check-in para:", reservaConfirmada.cliente.nome);
    console.log(JSON.stringify({reserva, valorCheckin, dataCheckin}));
    try{
      const confirmacao = window.confirm(
      `Tem certeza que deseja confirmar o check-in de ${reservaConfirmada.cliente.nome}?`
      );
      if(!confirmacao){
        return;
      }

      const token = sessionStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/cadastrarCheckin`, {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({reserva, valorCheckin, dataCheckin}),
      });
      navigate('/checkInSuccess', { 
      state: { guest: reservaConfirmada.cliente } 
    });
    }
    catch(error){

    };

    
  };

  return (
    <div className="wrapperViewReservations">
      <div className="menuLeftViewReservations">
        <MenuLeft />
      </div>

      <div className="contentViewReservations">
        {reservas.length === 0 ? (
          <p>Nenhuma reserva encontrada para check-in.</p>
        ) : (
          <div className="cardsContainer">
            {reservas.map((reserva, index) => (
              <ViewReservationsOfGuests
                key={index}
                name={reserva.cliente.nome}
                room={`Quarto ${reserva.quarto.numero}`}
                valueReservation={`R$ ${reserva.valorReserva}`}
                dateCheckIn={reserva.dataReserva}
                qtdGuests={`${reserva.qtdPessoas} Hóspedes`}
                // AQUI ESTÁ A MUDANÇA PRINCIPAL:
                // Passamos a função de confirmação para ser executada pelo ícone.
                // Quando o backend estiver pronto, troque para: onIconClick={() => handleConfirmCheckIn_Backend(reserva)}
                onIconClick={() => handleConfirmCheckIn(reserva)}
              />
            ))}
            {/* O BOTÃO SEPARADO FOI REMOVIDO DAQUI */}
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectedReservationCheckIn;