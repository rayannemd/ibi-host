import { BsCheckCircleFill } from "react-icons/bs";
import "./ViewReservationsOfGuests.css";

function ViewReservationsOfGuests({
  name,
  room,
  valueReservation,
  dateCheckIn,
  qtdGuests,
  onIconClick, // 1. Adicionamos a nova prop para receber a função de clique
}) {
  return (
    <div className="containerViewReservationsOfGuests">
      <div className="reservationInfoLeft">
        <strong>{name}</strong>
        <span>{room}</span>
        <span>{valueReservation}</span>
      </div>

      <div className="reservationInfoRight">
        <span>{dateCheckIn}</span>
        <span>{qtdGuests}</span>
        {/* 2. Aplicamos a função recebida ao evento onClick do ícone */}
        <BsCheckCircleFill 
          className="checkIcon" 
          onClick={onIconClick} 
        />
      </div>
    </div>
  );
}

export default ViewReservationsOfGuests;