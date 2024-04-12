import React, { useState } from "react";
import styles from "./auth.module.scss";
import { TiUserAddOutline } from "react-icons/ti";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authService";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { name, email, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("Todos os campos são Necessários.", {
        style: {
          whiteSpace: 'nowrap' 
        }
      });
    }
    if (password.length < 6) {
      return toast.error("A Senha deve ter até 6 Caracteres", {
        style: {
          whiteSpace: 'nowrap' 
        }
      });
    }
    if (!validateEmail(email)) {
      return toast.error("Por favor Digite um Email Válido", {
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
      name,
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
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
              <TiUserAddOutline size={35} color="#999" />
            </div>
            <h2>Cadastre-se</h2>

            <form onSubmit={register}>
              <input
                type="text"
                placeholder="Nome"
                required
                name="name"
                value={name}
                onChange={handleInputChange}
              />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="Senha"
                required
                name="password"
                value={password}
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="Confirma a Senha"
                required
                name="password2"
                value={password2}
                onChange={handleInputChange}
              />
              <button type="submit" className="--btn --btn-register --btn-block">
                Cadastre-se
              </button>
            </form>

            <span className={styles.register}>
              <Link className={`link-auth ${styles.link}`} to="/"> Home </Link>
              
              <Link className={`link-auth ${styles.link}`} to="/login"> Login</Link>
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Register;
