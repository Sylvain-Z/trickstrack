import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { FETCH_URL } from "../../../../Assets/Variables/const"; // pour version API
import { getItemWithExpiration } from "../../../../Assets/Variables/functions"; // pour version API

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faFilm } from "@fortawesome/free-solid-svg-icons";

function AddVideo() {
  const navigate = useNavigate();

  const myuserid = getItemWithExpiration("myuserid");
  const TOKEN = getItemWithExpiration("auth");

  const [video, setVideo] = useState(null); // gère le formulaires
  const [trick_name, setTrick_Name] = useState(""); // gère le formulaires

  const [msg, setMsg] = useState(null);

  async function handleUpload(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("video", video);
    const userId = myuserid;
    formData.append("user_Id", userId);
    const trickname = trick_name;
    formData.append("trick_name", trickname);

    if (!video) {
      setMsg("Ajoute un fichier");
    } else {
      try {
        const res = await fetch(FETCH_URL + "videos/add-video/" + myuserid, {
          headers: {
            enctype: "multipart/form-data",
            Authentication: `Bearer ${TOKEN}`,
          },
          method: "POST",
          body: formData,
        });
        const json = await res.json();
        setMsg(json.msg);
        if (res.status === 201) {
          //   window.location.reload();
          navigate("/utilisateurs/telechargement_reussi");
        }
      } catch (error) {
        console.error("Erreur lors de l'upload :", error.message);
      }
    }
  }

  return (
    <>
      <h3 className="form_title read">Montre nous tes prouesses !</h3>

      <form onSubmit={handleUpload} className="addVideo-form">

        <FontAwesomeIcon icon={faFilm} />
        <p className="advise">Format accepté .mp4</p>

        <label htmlFor="video">Télécharger la vidéo *</label>
        <input
          required
          type="file"
          name="video"
          accept="video/mp4"
          onChange={(e) => setVideo(e.target.files[0])}
        />

        <label htmlFor="trick_name">Trick principal de la vidéo *</label>
        <input
          required
          placeholder="Nom du trick"
          type="text"
          name="trick_name"
          value={trick_name}
          onChange={(e) => setTrick_Name(e.target.value)}
        />

        <input
          disabled
          placeholder="ID de l'utilisateur"
          type="hidden"
          name="myuserid"
          value={myuserid}
        />

        {msg && <p className="green">{msg}</p>}

        <button type="submit">
          <FontAwesomeIcon icon={faCircleCheck} size="lg" className="icon"/>
        </button>
      </form>
    </>
  );
}

export default AddVideo;
