import FormRegisterResident from "../../components/formRegisterResident/FormRegisterResident";
import MenuLeft from "../../components/menuLeftComponent/MenuLeft";
import "./RegisterResidentPage.css";
function RegisterResidentPage() {
    

    
    return(
        <div className="containerRegisterResidentPage">
            <div className="menuLeft">
                <MenuLeft/>
            </div>
            <div className="menuRigthRegisterResidentPage">
                <form className="formRegisterGuests" onSubmit={handleSubmit}>
                    <FormRegisterResident/>
                    <button type="submit" className="buttonFormRegisterResident">Cadastrar</button>
                </form>    
            </div>           
        </div>
    )
}

export default RegisterResidentPage;