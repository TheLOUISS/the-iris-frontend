import React, { useState } from "react";
import styles from "./auth.module.scss";
import { MdPassword } from "react-icons/md";
import Card from "../../components/card/Card";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/authService";

const initialState = {
  password: "",
  password2: "",
};

const Reset = () => {
  const [formData, setformData] = useState(initialState);
  const { password, password2 } = formData;

  const { resetToken } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("As senhas devem ter até 6 caracteres", {
        style: {
          whiteSpace: 'nowrap' 
        }
      });
    }
    if (password !== password2) {
      return toast.error("As senhas não são iguais", {
        style: {
          whiteSpace: 'nowrap' 
        }
      });
    }

    const userData = {
      password,
      password2,
    };

    try {
      const data = await resetPassword(userData, resetToken);
      toast.success(data.message);
    } catch (error) {
      console.log(error.message);
    }
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
              <MdPassword size={35} color="#999" />
            </div>
            <h2>Redefinir Senha</h2>

            <form onSubmit={reset}>
              <input
                type="password"
                placeholder="Nova Senha"
                required
                name="password"
                value={password}
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="Confirme a Nova Senha"
                required
                name="password2"
                value={password2}
                onChange={handleInputChange}
              />

              <button type="submit" className="--btn --btn-primary --btn-block">
                Redefinir Senha
              </button>
              <span className={styles.register}>
                  <Link className={`link-auth ${styles.link}`} to="/"> Home</Link>
                  <Link className={`link-auth ${styles.link}`} to="/login"> Login</Link>
              </span>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Reset;
