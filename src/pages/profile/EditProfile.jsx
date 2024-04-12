import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import { selectUser } from "../../redux/features/auth/authSlice";
import "./Profile.scss";
import { toast } from "react-toastify";
import { updateUser } from "../../services/authService";
import ChangePassword from "../../components/changePassword/ChangePassword";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Handle Image upload
      let imageURL;
      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "dmrpugrng");
        image.append("upload_preset", "gtqdrdvd");

        // Salvando imagem no Cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dmrpugrng/image/upload",
          { method: "post", body: image }
        );
        const imgData = await response.json();
        imageURL = imgData.url.toString();
      }
        // Salvando perfil do usuário
        const formData = {
          name: profile.name,
          phone: profile.phone,
          bio: profile.bio,
          photo: profileImage ? imageURL : profile.photo,
        };

        const data = await updateUser(formData);
        console.log(data);
        toast.success("Dados atualizados", {
          style: {
            whiteSpace: 'nowrap',
            marginLeft: '6em'
          }
        });
        navigate("/profile");
        setIsLoading(false);
      
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message, {
        style: {
          whiteSpace: 'nowrap' 
        }
      });
    }
  };

  return (
    <div className="profile --my2">
      {isLoading && <Loader />}

      <Card cardClass={"card --flex-dir-column"}>   
        <span className="profile-photo">
          <img src={user?.photo} alt="Foto de Perfil" />
        </span>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label className="label">Nome:</label>
              <input
                type="text"
                name="name"
                className="input"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label className="label">Email:</label>
              <input type="text" name="email" className="input-disabled" value={profile?.email} disabled />
              <br />
              <code>O e-mail não pode ser alterado.</code>
            </p>
            <p>
              <label className="label">Telefone:</label>
              <input
                type="text"
                name="phone"
                className="input"
                value={profile?.phone}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label className="label">Biografia:</label>
              <textarea
                name="bio"
                value={profile?.bio}
                onChange={handleInputChange}
                className="input"
                cols="30"
                rows="10"
              ></textarea>
            </p>
            <p>
              <label>Foto:</label>
              <input type="file" name="image" className="input-img" onChange={handleImageChange} />
            </p>
            <div>
              <button className="--btn --btn-primary">Editar Perfil</button>
            </div>
          </span>
        </form>
      </Card>
      <br />
      <ChangePassword />
    </div>
  );
};

export default EditProfile;
