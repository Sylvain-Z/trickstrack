import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns-tz";

// import { FETCH_URL } from "../../../Assets/Variables/const"; // pour version API
// import { getItemWithExpiration } from "../../../Assets/Variables/functions"; // pour version API

import { galery } from "./Galery"; // variables js pour démo version statique (hébergement sans BDD)

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRecordVinyl,
  faFire,
  faFaceSmile,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import AddComment from "../Comments/AddComment";

function GaleryVideos() {
  const params = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params]);

  // Code fetch API Node JS
  // const [videos, setVideos] = useState(null);

  // const [user, setUser] = useState(null);
  // const [userId, setUserID] = useState(null);
  // const [msg, setMsg] = useState("");
  // const myuserid = getItemWithExpiration("myuserid");
  // const TOKEN = getItemWithExpiration("auth");

  // useEffect(() => { // récupère toutes les vidéos trié dans l'ordre par ordre anté chronologique
  //   async function getData() {
  //     try {
  //       const videos = await fetch(FETCH_URL + "videos/last-upload", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       if (videos.status === 200) {
  //         const json = await videos.json();
  //         setVideos(json);
  //       }
  //     } catch (error) {
  //       throw Error(error);
  //     }
  //   }
  //   getData();
  // }, [videos]);

  // useEffect(() => { // Récupère l'id du user connecté pour l'envoyer dans la mise à jour d'un nombre de réaction
  //   async function getData() {
  //     try {
  //       let id = "";
  //       if (!myuserid) {
  //         return;
  //       } else {
  //         id = myuserid;
  //       }

  //       const user = await fetch(FETCH_URL + "users/" + id, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authentication: `Bearer ${TOKEN}`,
  //         },
  //       });

  //       if (user.status === 200) {
  //         const json = await user.json();
  //         setUser(json);
  //         setUserID(json[0].id);
  //       }
  //     } catch (error) {
  //       throw Error(error);
  //     }
  //   }
  //   getData();
  // }, []);

  // async function addReaction(reactionTotal, videoId) { // met à jour le nombre de réactions concernant la vidéo concernée
  //   try {
  //     const reaction_totalIncr = parseInt(reactionTotal) + 1;
  //     const reaction_totalDecr = parseInt(reactionTotal) - 1;

  //     if (!user) {
  //       // si l'utilisateur n'est pas connecté à un compte il ne peut pas ajouter de réaction

  //       setMsg("Compte utilisateur requis");

  //       setTimeout(() => {
  //         setMsg("");
  //       }, 3000);
  //     } else {
  //       // si l'utilisateur est connecté à un compte peut ajouter ou retirer une réaction
  //       const res = await fetch(
  //         FETCH_URL + "videos/react/" + userId + "/" + videoId,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authentication: `Bearer ${TOKEN}`,
  //           },
  //           body: JSON.stringify({
  //             reaction_totalIncr,
  //             reaction_totalDecr,
  //             userId,
  //             videoId,
  //           }),
  //         }
  //       );
  //     }
  //   } catch (error) {
  //     throw Error(error);
  //   }
  // }

  // code démo version statique (hébergement sans BDD) ++++++++++++++++++++++++++
  // Simule l'ajout et le retrait d'une réaction
  const [videos, setVideos] = useState(galery.map((item) => ({ ...item })));

  function addReaction(id) {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === id
          ? {
              ...video,
              reactions: video.reactions + (video.clicked ? -1 : 1),
              clicked: !video.clicked,
            }
          : video
      )
    );
  }

  return (
    <>
      {/* code démo version statique (hébergement sans BDD) ++++++++++++++++++++++++++ */}
      <div className="galery">
        {!videos ? (
          <>
            <p>Contenu en chargement, patientez</p>
          </>
        ) : (
          videos.map((video) => (
            <>
              <div>
                <figure key={video.id}>
                  <video className="galery-video" controls>
                    <source
                      src={"/Videos/" + video.title}
                      controls
                      type="video/mp4"
                    />
                  </video>
                  <figcaption>
                    <button
                      onClick={() => addReaction(video.id)}
                      className={
                        video.clicked ? "button_clicked" : "button_notclicked"
                      }
                    >
                      <FontAwesomeIcon icon={faFire} size="lg" />{" "}
                      {video.reactions}
                    </button>
                    <p>
                      <FontAwesomeIcon icon={faFaceSmile} size="xs" />{" "}
                      {video.pseudo}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faRecordVinyl} size="xs" />{" "}
                      {video.trick_name}{" "}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faCheck} size="xs" /> 2024-02-15
                    </p>
                  </figcaption>
                </figure>

                <AddComment />
              </div>
            </>
          ))
        )}

        <p className="galery_end">Fin de la liste</p>
        <p className="galery_end">
          Continue à progresser et montre nous tes tricks en video !
        </p>
      </div>

      {/* <div className="galery">
        {!videos ? (
          <>
            <p>Contenu en chargement, patientez</p>
          </>
        ) : (
          videos.map((video) => (
            <>
              <div>
                <figure key={video.video_id}>
                  <video className="galery-video" controls>
                    <source
                      src={"/Videos/" + video.title}
                      controls
                      type="video/mp4"
                    />
                  </video>
                  <figcaption>
                    {msg && <p className="red">{msg}</p>}
                    <button
                      onClick={() =>
                        addReaction(video.reaction_total, video.video_id)
                      }
                    >
                      <FontAwesomeIcon icon={faFire} size="xl" />{" "}
                      {video.reaction_total}
                    </button>
                    <p>
                      <FontAwesomeIcon icon={faFaceSmile} size="xs" />{" "}
                      {video.pseudo}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faRecordVinyl} size="xs" />{" "}
                      {video.trick_name}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faCheck} size="xs" />{" "}
                      {format(new Date(video.publication_date), "dd-MM-yyyy", {
                        timeZone: "auto",
                      })}
                    </p>
                  </figcaption>
                </figure>

                <AddComment />
              </div>
            </>
          ))
        )} 

        <p className="galery_end">Fin de la liste</p>
        <p className="galery_end">
          Continue à progresser et montre nous tes tricks en video !
        </p>
      </div>*/}
    </>
  );
}

export default GaleryVideos;
