import MenuLeft from "../../components/menuLeftComponent/MenuLeft.jsx";
import FormComponent from "../../components/formComponent/FormComponent.jsx";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "../checkGuests/CheckGuests.css";

function CheckIn() {
    const navigate = useNavigate();

    /**
     * Função assíncrona para lidar com o envio do formulário.
     * Busca as reservas de um hóspede com base no CPF informado.
     */
    const handleSubmit = async (e) => {
        // Previne o recarregamento da página, comportamento padrão do formulário.
        e.preventDefault();

        // Pega o valor do CPF do input e limpa-o, removendo caracteres não numéricos.
        const rawCpf = e.target.cpfCheckGuests.value;
        const cpf = rawCpf.trim().replace(/\D/g, "");

        // Validação simples para evitar requisições com CPF vazio.
        if (!cpf) {
            alert("Por favor, insira um CPF válido.");
            return; // Interrompe a execução da função.
        }

        console.log("Enviando CPF para o backend:", cpf);

        try {
            // Realiza a requisição POST para a API do backend.
            
            const token = sessionStorage.getItem("token");

            const response = await fetch("http://localhost:8080/api/listaReservas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                // ATENÇÃO: Enviando um objeto JSON. É o formato mais comum esperado por APIs.
                // Ex: { "cpf": "12345678900" }
                body: JSON.stringify({ cpf }),
            });

            // Verifica se a resposta do servidor foi bem-sucedida (status 2xx).
            if (response.ok) {
                const reservas = await response.json();
                console.log("Reservas recebidas do backend:", reservas);

                // Verifica se o array de reservas não está vazio.
                if (reservas && reservas.length > 0) {
                    // Navega para a próxima tela, passando as reservas encontradas.
                    navigate("/selectedReservationCheckIn", {
                        state: {
                            reservas, // equivale a { reservas: reservas }
                        },
                    });
                } else {
                    // O servidor respondeu OK, mas não encontrou reservas para este CPF.
                    alert("Nenhuma reserva encontrada para o CPF informado.");
                }
            } else {
                // Se o servidor retornar um erro (ex: 404, 500).
                alert(`[ERRO] Não foi possível buscar as reservas. O servidor respondeu com o status: ${response.status}`);
            }
        } catch (error) {
            // Se houver um erro de rede ou na própria requisição (ex: backend offline).
            console.error("Erro de conexão ou na requisição:", error);
            alert("Erro de conexão. Verifique se o servidor backend está online e acessível.");
        }
    };

    return (
        <div className="containerCheckGuests">
            <div className="menuLeftCheckGuests">
                <MenuLeft />
            </div>

            <div className="containerFormCheckGuests">
                {/* O `onSubmit` chama a função que se conecta ao backend */}
                <form onSubmit={handleSubmit}>
                    <FormComponent
                        icon={<HiOutlineDocumentText />}
                        headerInput={"Verificação de check-in"}
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

export default CheckIn;