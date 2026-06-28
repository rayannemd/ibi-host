import "./FormComponent.css";

function FormComponent({ icon, headerInput, message, type, placeholder, name, id, value, onChange, ...rest}) {
    return (
        <div className="inputGroup">
            <h1>{headerInput}</h1>
            <p>{message}</p>
            <div className="inputWrapper">
                {icon && <span className="icon">{icon}</span>}
                <input
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    {...rest}
                    required
                />
            </div>
        </div>
    );
}

export default FormComponent;
