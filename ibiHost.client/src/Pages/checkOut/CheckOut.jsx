import MenuLeft from "../../components/menuLeftComponent/MenuLeft.jsx";
import FormComponent from "../../components/formComponent/FormComponent.jsx";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "../checkGuests/CheckGuests.css";

// OBS: O nome do arquivo é CheckIn.jsx, mas o texto e a navegação
// parecem ser para a funcionalidade de "Check-Out". Apenas um ponto de atenção.
function CheckOut() {
  const navigate = useNavigate();

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

            const response = await fetch("http://localhost:8080/api/listaCheckins", {
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
                const checkins = await response.json();
                console.log("Checkins recebidos do backend:", checkins);

                // Verifica se o array de reservas não está vazio.
                if (checkins && checkins.length > 0) {
                    // Navega para a próxima tela, passando as reservas encontradas.
                    navigate("/checkOut/selectedReservationCheckOut", {
                        state: {
                            checkins, // equivale a { reservas: reservas }
                        },
                    });
                } else {
                    // O servidor respondeu OK, mas não encontrou reservas para este CPF.
                    alert("Nenhum checkin encontrado para o CPF informado.");
                }
            } else {
                // Se o servidor retornar um erro (ex: 404, 500).
                alert(`[ERRO] Não foi possível buscar os checkins. O servidor respondeu com o status: ${response.status}`);
            }
        } catch (error) {
            // Se houver um erro de rede ou na própria requisição (ex: backend offline).
            console.error("Erro de conexão ou na requisição:", error);
            alert("Erro de conexão. Verifique se o servidor backend está online e acessível.");
        }
    };
  // --- FIM: LÓGICA DE FRONTEND (Simulação) ---

  return (
    <div className="containerCheckGuests">
      <div className="menuLeftCheckGuests">
        <MenuLeft />
      </div>

      <div className="containerFormCheckGuests">
        {/*
          CORREÇÃO E BOA PRÁTICA:
          Envolvi os componentes em uma tag <form> e usei o evento `onSubmit` do formulário.
          Isso é mais semântico e acessível do que usar `onClick` em um botão de submissão.
        */}
        <form onSubmit={handleSubmit}>
          <FormComponent
            icon={<HiOutlineDocumentText />}
            headerInput={"Verificação de check-out"}
            message={"Insira o CPF do hóspede"}
            type={"text"}
            placeholder={"CPF"}
            name={"cpfCheckGuests"}
            id={"cpfCheckGuests"}
          />
          {/*
            O botão agora tem `type="submit"` e não precisa de `onClick`,
            pois o `onSubmit` do formulário já cuida disso.
          */}
          <button type="submit" className="buttonInput">
            VERIFICAR
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckOut;