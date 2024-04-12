import React from "react";
import "./Footer.scss";

const Footer = () => {
  const redirectToRandomLink = () => {
    const randomNum = Math.random(); 
    const redirectUrl =
      randomNum < 0.5
        ? "https://www.instagram.com/lou_is.gg/"
        : "https://louis-gg.netlify.app/";
    window.open(redirectUrl, "_blank"); 
  };

  return (
    <div className="--flex-center --py2 footer" onClick={redirectToRandomLink}>
      <p>
        Equipe Irís | Todos os Direitos Reservados. &copy; 2024
      </p>
    </div>
  );
};

export default Footer;
