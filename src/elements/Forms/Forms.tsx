import React from "react";
import "./formInput.css";


  export default function Contact() {
    const [result, setResult] = React.useState("");
  
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setResult("Sending....");
      const formData = new FormData(event.target as HTMLFormElement);
  
      formData.append("access_key", "577fd3f0-93c6-483c-9473-6429962e9485");
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
  
      if (data.success) {
        setResult("Form Submitted Successfully");
        (event.target as HTMLFormElement).reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    }; 

    return (
      <div>
        <div className="format">
        <form onSubmit={onSubmit}>
          <div className="format2">
            <div className="formInput">
              <div className='bg-gray-600 absolute w-full h-0.5 rounded'/>
              <label>Nombre</label>
              <input type="text" name="name" placeholder="Antonio Martínez" required/>
            </div>
            <div className="formInput">
              <div className='bg-gray-600 absolute w-full h-0.5 rounded'/>
              <label>email</label>
              <input type="email" name="email" placeholder="antoniomartinez@martinez.com" required/>
            </div>
            <div className="formInput">
              <div className='bg-gray-600 absolute w-full h-0.5 rounded'/>
              <label>¿Qué Buscas?</label>
              <textarea name="message" placeholder="Sesión, arte, moda,..." className="w-full h-fit"required></textarea>
            </div>
            <div className="pt-10">
              <button className="center text-white bg-transparent border-white border-2 hover:border-green-500 transition-all" type="submit">Enviar</button>
            </div>           
            
          </div>
          </form>
          <span>{result}</span>
        </div>          
      </div>
    );
  }