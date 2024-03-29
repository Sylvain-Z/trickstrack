import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from 'date-fns-tz';

import { FETCH_URL } from "../../../../Assets/Variables/const";
import { getItemWithExpiration } from "../../../../Assets/Variables/functions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRecordVinyl,
  faFire,
  faFaceSmile,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import AddComment from "../../Comments/AddComment";

function MyVideos() {
  const params = useParams();

  const [videos, SetVideos] = useState(null);

  const [userId, setUserID] = useState(null);
  const [msg, setMsg] = useState(null);

  const myuserid = getItemWithExpiration("myuserid");
  const TOKEN = getItemWithExpiration("auth");

  // récupère les vidéos de l'utilisateur connecté
  useEffect(() => {
    async function getData() {
      try {
        const videos = await fetch(FETCH_URL + "videos/" + params.id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authentication: `Bearer ${TOKEN}`,
          },
        });

        if (videos.status === 200) {
          const json = await videos.json();
          SetVideos(json);
        }
      } catch (error) {
        throw Error(error);
      }
    }
    getData();
  }, [videos]);

  // Récupère l'id du user connecté pour l'envoyer dans la mise à jour d'un nombre de réaction
  useEffect(() => {
    async function getData() {
      try {
        let id = "";
        if (!myuserid) {
          return;
        } else {
          id = myuserid;
        }
        const user = await fetch(FETCH_URL + "users/" + id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authentication: `Bearer ${TOKEN}`,
          },
        });

        if (user.status === 200) {
          const json = await user.json();
          setUserID(json[0].id);
        }
      } catch (error) {
        throw Error(error);
      }
    }
    getData();
  }, []);

  // met à jour le nombre de réactions concernant la vidéo concernée
  async function addReaction(reactionTotal, videoId) {
    try {
      const reaction_totalIncr = parseInt(reactionTotal) + 1;
      const reaction_totalDecr = parseInt(reactionTotal) - 1;

      if (!userId) {
        // si l'utilisateur n'est pas connecté à un compte il ne peut pas ajouter de réaction

        setMsg("Compte utilisateur requis");

        setTimeout(() => {
          setMsg("");
        }, 3000);
      } else {
        // si l'utilisateur est connecté à un compte peut ajouter ou retirer une réaction
        const res = await fetch(
          FETCH_URL + "videos/react/" + userId + "/" + videoId,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authentication: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify({
              reaction_totalIncr,
              reaction_totalDecr,
              userId,
              videoId,
            }),
          }
        );
      }
    } catch (error) {
      throw Error(error);
    }
  }

  return (
    <>
      <h3>Mes vidéos</h3>

      <div className="mytracker-galery">

      {!videos ? (
        <>
          <p>Contenu en chargement, patientez</p>
        </>
      ) : (
        videos.map((video) => (
          <>
          <div>
            <figure key={video.video_id}>
              <video className="myvideo" controls>
                <source
                  src={"/Videos/" + video.title}
                  controls
                  type="video/mp4"
                />
              </video>
              <figcaption>
                <button
                  onClick={() =>
                    addReaction(video.reaction_total, video.video_id)
                  }
                >
                  <FontAwesomeIcon icon={faFire} size="lg" />{" "}
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
                  {format(
                    new Date(video.publication_date),
                    "dd-MM-yyyy",
                    { timeZone: "auto" }
                  )}
                </p>
              </figcaption>
            </figure>

            <AddComment/>
            </div>

          </>
        ))
      )}
      </div>

      <p className="galery_end">Fin de la liste</p>
      <p className="galery_end">
        Continue à progresser et montre nous tes tricks en video !
      </p>
    </>
  );
}

export default MyVideos;
