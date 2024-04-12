import React from "react";
import { GiShinyIris } from "react-icons/gi";
import { Link } from "react-router-dom";
import "./Home.scss";
import heroImg from "../../assets/inv-img.png";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between">
        <div className="logo">
          <GiShinyIris size={35} />
        </div>

        <ul className="home-links">
          <ShowOnLogout>
            <li>
              <Link to="/register">Cadastre-se</Link>
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <button className="--btn --btn-primary dashboard-btn">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
    
      <div className="tools">
        <div className="circle">
          <span className="purple box"></span>
        </div>
        <div className="circle">
          <span className="blue box"></span>
        </div>
        <div className="circle">
          <span className="green box"></span>
        </div>
      </div>
      
      {/* HERO SEÇÃO */}
      <section className="container hero">
        <div className="hero-text">
          <h2>Inventário {"&"} Solução de Gerenciamento de Estoque</h2>
          <p>
            Sistema de estoque para controlar e gerenciar produtos/itens em
            tempo real e integrado para facilitar o desenvolvimento do seu
            negócio.
          </p>
          <div className="hero-buttons">
            <button className="--btn --btn-secondary">
              <Link to="/dashboard">Experimente Grátis!</Link>
            </button>
          </div>
          <div className="--flex-start">
            <NumberText num="100%" text="Gratuito!" />
          </div>
        </div>

        <div className="hero-image">
          <img className="--img" src={heroImg} alt="Inventário" />
        </div>
      </section>
    </div>
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;
