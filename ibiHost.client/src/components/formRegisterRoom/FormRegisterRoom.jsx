import { Form } from "react-router-dom";
import FormComponent from "../formComponent/FormComponent.jsx";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { MdOutlineRoomPreferences } from "react-icons/md";
import { MdOutlineReduceCapacity } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";


function FormRegisterRoom() {
  return (
    <div>
      <FormComponent
      icon={<AiOutlineFieldNumber />}
      headerInput={"Cadastrar Quarto"}
      type={"text"}
      placeholder={"Número do Quarto"}
      name={"fullNameRoom"}
      id={"fullNameRoom"}
      />
      <FormComponent
      icon={<MdOutlineRoomPreferences />}
      type={"text"}
      placeholder={"Tipo de Quarto"}
      name={"typeRoom"}
      id={"typeRoom"}
      />
      <FormComponent
      icon={<MdOutlineReduceCapacity />}
      type={"text"}
      placeholder={"Capacidade"}
      name={"capacity"}
      id={"capacity"} 
      />
      <FormComponent
      icon={<MdAttachMoney />}
      type={"text"}
      placeholder={"Valor"}
      name={"value"}
      id={"value"}
      />
    </div>
  );
}

export default FormRegisterRoom;