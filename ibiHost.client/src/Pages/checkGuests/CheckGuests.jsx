import MenuLeft from "../../components/menuLeftComponent/MenuLeft.jsx";
import FormComponent from "../../components/formComponent/FormComponent.jsx";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "./CheckGuests.css";
function CheckGuests() {
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log("e.target:", e.target);
        console.log("e.target.cpf.value:", e.target.cpfCheckGuests.value);
        const cpf = e.target.cpfCheckGuests.value;

        console.log("CPF:", cpf);
        try {
            const token = sessionStorage.getItem("token");

            const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/checkGuests`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ cpf }),
            });

            if (response.ok) {
                const cliente = await response.json();
                alert("Cliente encontrado!");
                navigate("/reservation",{
                    state:{
                        cliente:{
                            nome: cliente.nome,
                            cpf: cliente.cpf
                        }
                    }
                });
                
            } else {
                alert("Hóspede não encontrado!");
                navigate("/registerGuest");
            }
        } catch (error) {
            console.error("Erro", error);
            alert("Erro na requisição");
        }
      };


    return(
        <div className="containerCheckGuests">
            <div className="menuLeftCheckGuests">
                <MenuLeft />
            </div>
            <div className="containerFormCheckGuests">
                <form className="formCheckGuests" onSubmit={handleSubmit}>
                <FormComponent 
                icon={<HiOutlineDocumentText />} 
                headerInput={"Verificação de hóspede"}
                message={"Insira o CPF do hóspede"}
                type={"text"}
                placeholder={"CPF"}
                name={"cpfCheckGuests"}
                id={"cpfCheckGuests"}
                />
                <button type="submit" className="buttonInput">VERIFICAR</button>
                </form>
            </div>
        </div>
    );
}

export default  CheckGuests;

