import { useState } from "react";
import "./formInput.css";



const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, placeholder, ...inputProps } = props;
  
    const handleFocus = (e) => {
      setFocused(true);
    };
  
    return (
      <div className="formInput">
        <div className='bg-gray-600 absolute w-full h-0.5 rounded'/>
        <label>{label}</label>
        <input
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
          onFocus={() =>
            inputProps.name === "confirmPassword" && setFocused(true)
          }
          focused={focused.toString()}
          placeholder={placeholder}
        />
        <span>{errorMessage}</span>
      </div>
    );
  };
  
  export default function Form(){
    const [values, setValues] = useState({
        name: "",
        email: "",
        quebuscas: "",
        mensaje: ""
      });

    const inputs = [
        {
            id:1,
            label:"Nombre",
            type:"text",
            placeholder:"Antonio Martínez",
            required:true
        },
        {
            id:2,
            label:"e-mail",
            type:"text",
            placeholder:"antoniomartinez@martinez.com",
            required:true
        },
        {
            id:3,
            label:"¿Qué Buscas?",
            type:"text",
            placeholder:"Sesión, arte, moda,..."
        },
        {
            id:4,
            label:"Mensaje",
            type:"text",
            placeholder:"Hola! necesito tus servicios...",
            required:true
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault();

      };
    
      const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };

    return (
        <div className="format">
            <div className="format">
                <form onSubmit={handleSubmit}>
                    {inputs.map((input) => (
                        <FormInput
                            key={input.id}
                            {...input}
                            value={values[input.name]}
                            onChange={onChange}
                        />
                    ))}
                    <button className="center">Enviar</button>
                </form>
            </div>
        </div>
    )
  }