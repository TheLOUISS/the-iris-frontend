import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import { SpinnerImg } from "../../components/loader/Loader";
import useRedirectLoggedOutUser from "../../hook/useRedirectLoggedOutUser";
import { SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";
import { getUser } from "../../services/authService";
import "./Profile.scss";

const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getUserData() {
      const data = await getUser();
      console.log(data);

      setProfile(data);
      setIsLoading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    }
    getUserData();
  }, [dispatch]);

  return (
    <div className="profile --my2">
      {isLoading && <SpinnerImg />}
      <>
        {!isLoading && profile === null ? (
          <p>Algo deu errado, atualize a página..</p>
        ) : (
          <Card cardClass={"card --flex-dir-column"}>
            <span className="profile-photo">
              <img src={profile?.photo} alt="Foto de Perfil" />
            </span>
            <span className="profile-data">
            <div className="circles">
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
              <div className="circle circle-3"></div>
            </div>
              <p>
                <b>Nome : </b> {profile?.name}
              </p>
              <p>
                <b>Email : </b> {profile?.email}
              </p>
              <p>
                <b>Telefone : </b> {profile?.phone}
              </p>
              <p>
                <b>Biografia : </b> {profile?.bio}
              </p>
              <div>
                <Link to="/edit-profile">
                  <button className="--btn --btn-primary">Editar Perfil</button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
};

export default Profile;
