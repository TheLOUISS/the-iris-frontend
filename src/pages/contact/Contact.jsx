import React, { useState } from "react";
import Card from "../../components/card/Card";
import "./Contact.scss";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../services/authService";

const Contact = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const data = {
    subject,
    message,
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/contactus`, data);
      setSubject("");
      setMessage("");
      toast.success(response.data.message, {
        style: {
          whiteSpace: 'nowrap' 
        }
      });
    } catch (error) {
      toast.error(error.message, {
        style: {
          whiteSpace: 'nowrap' 
        }
      });
    }
  };

  return (
    <div className="contact">
      <h3 className="--mt">Contate-nos</h3>
      <div className="section">
        <form onSubmit={sendEmail}>
          <Card cardClass="card">
            <div className="circles">
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
              <div className="circle circle-3"></div>
            </div>
            <label>Assunto</label>

            <input
              type="text"
              name="subject"
              placeholder="Assunto..."
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <label>Mensagem</label>
            <textarea
              cols="30"
              rows="10"
              name="message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button className="--btn --btn-primary">Enviar mensagem</button>
          </Card>
        </form>

        <div className="details">
          <Card cardClass={"card2"}>
          <div className="circles">
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
              <div className="circle circle-3"></div>
            </div>
            <h3>Nossas informações de contato</h3>
            <p>
              Por gentileza, proceda ao preenchimento do formulário
              disponibilizado ou, caso prefira, estabeleça comunicação conosco
              por meio dos diversos canais elencados subsequentemente.
            </p>

            <div className="icons">
              <span>
                <FaPhoneAlt />
                <p>(42) 98435-9457 - (42) 98842-6394</p>
              </span>
              <span>
                <FaEnvelope />
                <p>louisfiveghz@outlook.com - brunaapageski@gmail.com</p>
              </span>
              <span>
                <GoLocation />
                <p>União da Vitória, Paraná</p>
              </span>
              <span>
                <FaTwitter />
                <p>@LouisGGWP - @biohazardall</p>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
