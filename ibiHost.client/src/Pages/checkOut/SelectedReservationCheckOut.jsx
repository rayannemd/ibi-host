import ViewReservationsOfGuests from "../../components/viewReservationsGuests/ViewReservationsOfGuests";
import MenuLeft from "../../components/menuLeftComponent/MenuLeft.jsx";
import { useLocation, useNavigate } from "react-router-dom"; // useNavigate não estava sendo usado, então removi.
import "../checkIn/SelectedReservationCheckIn.css";

function SelectedReservationCheckIn() {
  // Esta parte é front-end: pega os dados passados pela navegação via React Router.
  const location = useLocation();
  const navigate = useNavigate();
  
  const checkins = location.state?.checkins || [];

  console.log("Checkins recebidos na tela de seleção:", checkins);

  const handleConfirmCheckOut = async (checkin) => {

    console.log("Botao clicado!");
    const checkinPayLoad = {id: checkin.id};
    console.log("Checkin recebido: ", checkin);

    const checkout = {
      checkin: checkinPayLoad,
      clienteNome: checkin.reserva.cliente.nome,
      dataSaida: checkin.reserva.dataCheckin,
      valorTotal: checkin.valorCheckin + checkin.reserva.valorReserva,
    };

    console.log("Meu JSON: ", JSON.stringify(checkout));
    try{
      const confirmacao = window.confirm(
      `Tem certeza que deseja confirmar o checkout de ${checkin.reserva.cliente.nome}?`
      );
      if(!confirmacao){
        return;
      }

      const token = sessionStorage.getItem("token");

      const response = await fetch("http://localhost:8080/api/cadastrarCheckout", {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(checkout),
      });
      navigate('/checkOutSuccess', { 
      state: { guest: checkin.reserva.cliente } 
    });

    }
    catch(error){

    }
  }
  return (
    <div className="wrapperViewReservations">
      <div className="menuLeftViewReservations">
        <MenuLeft />
      </div>

      <div className="contentViewReservations">
        {checkins.length === 0 ? (
          <p>Nenhuma reserva encontrada para este cliente.</p>
        ) : (
          // CORREÇÃO: A propriedade 'backgroundColor' foi trocada por 'style' para funcionar corretamente.
          // Se isso era apenas um teste, pode remover o style.
          <div
            className="cardsContainer"
            style={{ backgroundColor: "#f9f9f9" /* Exemplo de cor */ }}
          >
            {checkins.map((checkin, index) => (
              <ViewReservationsOfGuests
                key={index}
                name={checkin.reserva.cliente.nome}
                room={`Quarto ${checkin.reserva.quarto.numero}`}
                valueReservation={`R$ ${checkin.valorCheckin}`}
                dateCheckIn={checkin.dataCheckin}
                qtdGuests={`${checkin.reserva.qtdPessoas} Hóspedes`}
                onIconClick={() => handleConfirmCheckOut(checkin)}
              />
            ))}
          </div>
        )}
        {/*<button className="confirmCheckInButton" onClick={handleConfirmCheckOut}>
          Confirmar Check-Out
        </button>*/}
      </div>
    </div>
  );
}

export default SelectedReservationCheckIn;
