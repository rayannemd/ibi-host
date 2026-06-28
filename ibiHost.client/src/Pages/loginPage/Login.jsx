
import FormComponent from "../../components/formComponent/FormComponent";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import "./Login.css";
import logo from "../../assets/ibi-logo.png"; 
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";
function Login() {

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem("token");
  }, []);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    console.log("e.target:", e.target);
    console.log("e.target.email.value:", e.target.email.value);
    console.log("e.target.senha.value:", e.target.senha.value);


    console.log("entrou papai")
    const email = e.target.email.value;
    const senha = e.target.senha.value;

    

    try{
      const resposta = await
      fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, senha}),
      });
      
      if(resposta.ok){
        const token = await
        resposta.text();
        console.log("token retornado: ", token)
        sessionStorage.setItem("token", token);
        navigate("/menu");
        }
        else{
          alert("Login invalido!");
        }
      }

      catch(erro){
        console.error("Erro", erro);
        alert("Erro na requisição");
      }
      
    };
  


  return (
    <div className="loginPage">
      <div className="loginContainer">
        <div className="leftSide">
          <img src={logo} alt="Logo IbiHost" className="logo" />
          <h2>IbiHost</h2>
          <div className="welcomeText">
            <h3>Bem vindo!</h3>
            <p>Bom ter você como colaborador.</p>
          </div>
        </div>

        <div className="rightSide">
          <form className="loginForm" onSubmit={(handleSubmit)}>
            <FormComponent
              icon={<HiOutlineMail />}
              headerInput="Acesse sua conta"
              message="Iniciar sessão"
              type="text"
              placeholder="E-mail"
              name="email"
              id="email"
            />
            <FormComponent
              icon={<HiOutlineLockClosed />}
              type="password"
              placeholder="Senha"
              name="senha"
              id="password"
            />
            <button type="submit" className="loginButton">ENTRAR</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
