import { Form } from "react-router-dom";
import FormComponent from "../formComponent/FormComponent.jsx";
import { FiUser } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { MdLocalPhone } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";


function FormRegisterResident() {
  return (
    <div>
      <FormComponent
      icon={<FiUser />}
      headerInput={"Cadastrar Hóspede"}
      type={"text"}
      placeholder={"Nome Completo"}
      name={"fullName"}
      id={"fullName"}
      />
      <FormComponent
      icon={<HiOutlineDocumentText />}
      type={"text"}
      placeholder={"CPF"}
      name={"cpf"}
      id={"cpf"}
      />
      <FormComponent
      icon={<MdLocalPhone />}
      type={"text"}
      placeholder={"Telefone"}
      name={"phone"}
      id={"phone"} 
      />
      <FormComponent
      icon={<IoLocationSharp />}
      type={"text"}
      placeholder={"Endereço"}
      name={"address"}
      id={"address"}
      />
    </div>
  );
}

export default FormRegisterResident;