import React, { useState } from "react";
import styles from "./auth.module.scss";
import { GiShinyIris } from "react-icons/gi";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../../services/authService";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Todos os campos são necessários", {
        style: {
          whiteSpace: 'nowrap' 
        }
      });
    }

    if (!validateEmail(email)) {
      return toast.error("Por favor digite um email válido.", {
        style: {
          whiteSpace: 'nowrap' 
        }
      });
    }

    const userData = {
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      console.log(data);
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
              <GiShinyIris className={styles.logo} size={35} color="#0066FF" />
            </div>
            <h2 className={styles.title}>LOGIN</h2>

            <form onSubmit={login}>
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
              <button
                type="submit"
                className={`--btn --btn-login --btn-block --btn-auth ${styles.btn}`}
              >
                Login
              </button>
            </form>
            <Link className={`link ${styles.link}`} to="/forgot">Esqueceu sua senha?</Link>

            <span className={styles.register}>
              <Link className={`link-auth ${styles.link}`} to="/"> Home </Link>
              
              <Link className={`link-auth ${styles.link}`} to="/register">Cadastre-se</Link>
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
