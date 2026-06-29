import { Form } from "react-router-dom";
import MenuLeft from "../../menuLeftComponent/MenuLeft";
import FormComponent from "../../formComponent/FormComponent";
import { RiUser3Line } from "react-icons/ri";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import "../../../Pages/checkGuests/CheckGuests.css";



function RegisterGuest() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {

      e.preventDefault();
      console.log("e.target:" , e.target);
      console.log("e.target.cpf.value:" , e.target.guestCpf.value);
      console.log("e.target.nome.value:" , e.target.guestName.value);
      console.log("e.target.endereco.value:" , e.target.guestAddress.value);
      console.log("e.target.telefone.value" , e.target.guestPhone.value);

      console.log(":)");
      const cpf = e.target.guestCpf.value;
      const nome = e.target.guestName.value;
      const endereco = e.target.guestAddress.value;
      const telefone = e.target.guestPhone.value;
      const email = e.target.guestEmail.value;

      if(!cpf || !nome || !endereco || !telefone || !email){
        alert("Algum(s) campos estão vazios. Preecha-os para continuar!");
        return;
      }

      const cpfRegex = /^\d{11}$/;
      const telefoneRegex = /^\d{10,11}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!cpfRegex.test(cpf)) {
        alert("CPF deve conter 11 números.");
        return;
      }

      if (!telefoneRegex.test(telefone)) {
        alert("Telefone inválido. Deve conter 10 ou 11 dígitos numéricos.");
        return;
      } 

      if (!emailRegex.test(email)) {
        alert("E-mail inválido.");
        return;
      }

      try{
          const token = sessionStorage.getItem("token");

          const response = await
          fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/registerGuest`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify({cpf , nome , endereco , telefone, email}),
          });

          if(response.ok){
              const cliente = await response.json();
              alert("Cadastro realizado: " + cliente);
              navigate("/reservation", {
                state:{
                  cliente:{
                    nome: cliente.nome,
                    cpf: cliente.cpf
                  }
                }
              });
          } else{
              alert("Não foi possível cadastrar o cliente.");
          }
      } catch(erro){
          console.error("Erro: " , erro);
          alert("Erro ao cadastrar.");
      }


  }

  return (
    <div className="containerCheckGuests">
      <div className="menuLeftCheckGuests">
        <MenuLeft />
      </div>
      <div className="containerFormCheckGuests">
        <form className="formCheckGuests" onSubmit={handleSubmit}>
        <FormComponent
            icon={<RiUser3Line />}
            headerInput={"Cadastrar hóspede"}
            type={"text"}
            placeholder={"Nome Completo"}
            name={"guestName"}
            id={"guestName"}
        />
        <FormComponent
            icon={<HiOutlineDocumentText />}
            type={"text"}
            placeholder={"CPF"}
            name={"guestCpf"}
            id={"guestCpf"}
            inputMode="numeric"
            maxLength="11"
            required
        />
        <FormComponent
            icon={<BsFillTelephoneFill />} 
            type={"tel"}
            placeholder={"Número para contato"}
            name={"guestPhone"}
            inputMode="numeric"
            id={"guestPhone"}
        />
        <FormComponent
            icon={<HiOutlineDocumentText />}
            type={"text"}
            placeholder={"E-mail"}
            name={"guestEmail"}
            id={"guestEmail"}
        />
        <FormComponent
            icon={<FaLocationDot />}
            type={"text"}
            placeholder={"Endereço"}
            name={"guestAddress"}
            id={"guestAddress"}
        />
        <button type = "submit" className="buttonInput">CADASTRAR</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterGuest;
