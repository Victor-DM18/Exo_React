import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const FormContact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        // YOUR_SERVICE_ID
        process.env.REACT_APP_SERVICE_ID,
        // YOUR_TEMPLATE_ID
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        // YOUR_PUBLIC_KEY
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        () => {
          form.current.reset();
          Swal.fire("Cofirmation!", "Message envoyé ", "success");
        },
        () => {
          Swal.fire("Erreur !", "Un problème est survenu !", "warming");
        }
      );
  };
  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="flex flex-col items-center w-[100%]"
    >
      <label>Name</label>
      <input
        type="text"
        name="name"
        autoComplete="off"
        required
        className="border border-cyan-400 rounded-lg mb-5 text-black bg-gray-200"
      />
      <label>Email</label>
      <input
        type="email"
        name="email"
        autoComplete="off"
        required
        className="border border-cyan-400 rounded-lg mb-5 text-black bg-gray-200"
      />
      <label>Message</label>
      <textarea
        name="message"
        required
        className="border border-cyan-400 rounded-lg mb-5 w-[80%] h-64 flex justify-center text-black bg-gray-200"
      />
      <input
        type="submit"
        value="Envoyer"
        className="bg-cyan-400 p-3 rounded-xl text-black w-36"
      />
    </form>
  );
};

export default FormContact;
