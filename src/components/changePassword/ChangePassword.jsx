import React, { useState } from "react";
import "./ChangePassword.scss";
import { toast } from "react-toastify";
import { changePassword } from "../../services/authService";
import Card from "../card/Card";
import { useNavigate } from "react-router-dom";

const initialState = {
  oldPassword: "",
  password: "",
  password2: "",
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const changePass = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      return toast.error("As novas senhas não correspondem.", {
        style: {
          whiteSpace: 'nowrap' 
        }
      });
    }

    const formData = {
      oldPassword,
      password,
    };

    const data = await changePassword(formData);
    toast.success(data, {
      style: {
        whiteSpace: 'nowrap' 
      }
    });
    navigate("/profile");
  };

  return (
    <div className="change-password">
      <Card cardClass={"password-card"}>
      <div className="circles">
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
              <div className="circle circle-3"></div>
            </div>
        <h3>Alterar Senha</h3>
        <form onSubmit={changePass} className="--form-control">
          <input
            type="password"
            placeholder="Senha Antiga"
            required
            name="oldPassword"
            className="input"
            value={oldPassword}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Nova Senha"
            required
            name="password"
            className="input"
            value={password}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Confirme a Nova Senha"
            required
            name="password2"
            className="input"
            value={password2}
            onChange={handleInputChange}
          />
          <button type="submit" className="--btn --btn-alterar-senha">
            Alterar Senha
          </button>
        </form>
      </Card>
    </div>
  );
};

export default ChangePassword;
