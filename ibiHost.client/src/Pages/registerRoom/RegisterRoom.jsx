import FormRegisterRoom from "../../components/formRegisterRoom/FormRegisterRoom";
import MenuLeft from "../../components/menuLeftComponent/MenuLeft";
import "../registerResidentPage/RegisterResidentPage.css";
function RegisterResidentPage() {
    return(
        <div className="containerRegisterResidentPage">
            <div className="menuLeft">
                <MenuLeft/>
            </div>
            <div className="menuRigthRegisterResidentPage">
                <FormRegisterRoom/>
                <button className="buttonFormRegisterResident">Cadastrar</button>    
            </div>           
        </div>
        
    )
}
export default RegisterResidentPage;