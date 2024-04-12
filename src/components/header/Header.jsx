import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectName, SET_LOGIN } from "../../redux/features/auth/authSlice";
import { logoutUser } from "../../services/authService";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  };

  const getGreeting = () => {
    const currentTime = new Date().getHours();

    if (currentTime >= 5 && currentTime < 12) {
      return "Bom dia, que seu dia seja produtivo e feliz";
    } else if (currentTime >= 12 && currentTime < 18) {
      return "Desejo-lhe uma tarde tranquila e produtiva";
    } else {
      return "Esperamos que tenha uma boa noite de descanso e tranquilidade";
    }
  };

  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">{getGreeting()}, </span>
          <span className="--color-name">{name}</span>
        </h3>
        <button onClick={logout} className="--btn --btn-logout">
          Sair
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Header;
