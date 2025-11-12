import React, { useState, useCallback } from "react";
import "./formInput.css"; // Import the refined CSS

const GOOGLE_FORM_ACTION_URL = import.meta.env.VITE_GOOGLE_FORM_ACTION_URL;
const ENTRY_NAME_ID = import.meta.env.VITE_GOOGLE_FORM_ENTRY_NAME;
const ENTRY_EMAIL_ID = import.meta.env.VITE_GOOGLE_FORM_ENTRY_EMAIL;
const ENTRY_MESSAGE_ID = import.meta.env.VITE_GOOGLE_FORM_ENTRY_MESSAGE;

// Check configuration validity once
const isConfigValid = !!GOOGLE_FORM_ACTION_URL && !!ENTRY_NAME_ID && !!ENTRY_EMAIL_ID && !!ENTRY_MESSAGE_ID;

if (!isConfigValid && import.meta.env.DEV) { // Log error only in development
    console.error(
        "⚠️ Google Form Configuration Missing! Ensure VITE_GOOGLE_FORM_ACTION_URL and all VITE_GOOGLE_FORM_ENTRY_*** variables are set in your .env file."
    );
}
// --- End Configuration ---

type SubmitStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isConfigValid) {
        setMessage("Error: Form configuration is missing.");
        setSubmitStatus("error");
        return;
    }

    setSubmitStatus("sending");
    setMessage("Enviando...");

    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const googleFormData = new URLSearchParams();

    // Append form data using the configured entry IDs
    googleFormData.append(ENTRY_NAME_ID, formData.get("name") as string);
    googleFormData.append(ENTRY_EMAIL_ID, formData.get("email") as string);
    googleFormData.append(ENTRY_MESSAGE_ID, formData.get("message") as string);

    try {
      const response = await fetch(GOOGLE_FORM_ACTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Explicitly set the content type
        },
        body: googleFormData.toString(), // Properly formatted body
      });
    
      // Check if the response status is in the 2xx range
      if (response.ok || response.type === "opaque") {
        // Assume success for 'no-cors' opaque responses
        setSubmitStatus("success");
        setMessage("Formulario enviado con éxito!");
        formElement.reset();
    
        setTimeout(() => {
          // Reset message only if the status hasn't changed again
          if (submitStatusRef.current === "success") {
            setMessage("");
            setSubmitStatus("idle");
          }
        }, 5000); // Clear success message after 5 seconds
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("Form Submission Error:", error);
      setSubmitStatus("error");
      setMessage("Formulario enviado con éxito!");
    }
  }, []); // No dependencies needed as config is stable

  // Ref to track status for setTimeout cleanup
  const submitStatusRef = React.useRef(submitStatus);
  React.useEffect(() => {
    submitStatusRef.current = submitStatus;
  }, [submitStatus]);

  const isSending = submitStatus === "sending";

  return (
    <div className="contact-form-container">
      <form onSubmit={handleSubmit} className="the-actual-form">
        <div className="formInput">
          <label htmlFor="name-input">Nombre</label>
          <input
            id="name-input"
            type="text"
            name="name"
            placeholder="Tu nombre"
            required
            disabled={isSending}
          />
        </div>
        <div className="formInput">
          <label htmlFor="email-input">Email</label>
          <input
            id="email-input"
            type="email"
            name="email"
            placeholder="tu@email.com"
            required
            disabled={isSending}
          />
        </div>
        <div className="formInput">
          <label htmlFor="message-input">¿Qué Buscas?</label>
          <textarea
            id="message-input"
            name="message"
            placeholder="Describe tu consulta..."
            required
            disabled={isSending}
            rows={5}
          ></textarea>
        </div>
        <div className="submit-button-container">
          <button
            className={`
              submit-button-base
              text-white bg-transparent border-white border-2
              hover:border-green-500 hover:text-green-500
              focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900
              disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-400
            `}
            type="submit"
            disabled={isSending || !isConfigValid}
          >
            {isSending ? "Enviando..." : (isConfigValid ? "Enviar" : "Config Missing")}
          </button>
        </div>
        {message && (
            <p className={`text-center mt-4 text-sm font-medium ${
              submitStatus === 'error' ? 'text-red-400' : submitStatus === 'success' ? 'text-green-400' : 'text-gray-400'
            }`}>
                {message}
            </p>
        )}
         {!isConfigValid && (
             <p className="text-center mt-2 text-xs text-yellow-500">
                 Form submission disabled due to missing configuration.
             </p>
         )}
      </form>
    </div>
  );
}