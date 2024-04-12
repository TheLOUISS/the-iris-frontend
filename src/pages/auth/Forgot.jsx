import React, { useState } from "react";
import styles from "./auth.module.scss";
import { AiOutlineMail } from "react-icons/ai";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { forgotPassword, validateEmail } from "../../services/authService";
import { toast } from "react-toastify";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const forgot = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Por favor insira um e-mail.", {
        style: {
          whiteSpace: 'nowrap' 
        }
      });
    }

    if (!validateEmail(email)) {
      return toast.error("Por favor didite um email válido", {
        style: {
          whiteSpace: 'nowrap' 
        }
      });
    }

    const userData = {
      email,
    };

    await forgotPassword(userData);
    setEmail("");
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card cardClass={styles.card}>
        <div className={styles.tools}>
          <div className={styles.circle}>
            <span className={`${styles.box} ${styles.red}`}></span>
          </div>
          <div className={styles.circle}>
            <span className={`${styles.box} ${styles.yellow}`}></span>
          </div>
          <div className={styles.circle}>
            <span className={`${styles.box} ${styles.green}`}></span>
          </div>
        </div>
        <div className={styles.card__content}>
          <div className={styles.form}>
            <div className={`--flex-center ${styles.logo}`}>
              <AiOutlineMail size={35} color="#999" />
            </div>
            <h2>Esqueceu sua Senha?</h2>

            <form onSubmit={forgot}>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button type="submit" className="--btn --btn-forgot --btn-block">
                Enviar E-mail
              </button>
              <div className={styles.register}>
                <p>
                  <Link className={`link-auth ${styles.link}`} to="/"> Home</Link>
                </p>
                <p>
                  <Link className={`link-auth ${styles.link}`} to="/login"> Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Forgot;
