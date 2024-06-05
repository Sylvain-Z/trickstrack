import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { FETCH_URL } from "../../../../Assets/Variables/const";
import { getItemWithExpiration } from "../../../../Assets/Variables/functions";
import { timeElapsed } from "../../../../Assets/Variables/functions";

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

  const myuserid = getItemWithExpiration("myuserid");
  const TOKEN = getItemWithExpiration("auth");

  // récupère les vidéos de l'utilisateur connecté
  useEffect(() => {
    async function getUserVideos() {
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
    getUserVideos();
  }, [videos]);

  // met à jour le nombre de réactions concernant la vidéo concernée
  async function addReaction(reactionTotal, videoId) {
    // met à jour le nombre de réactions concernant la vidéo concernée
    try {
      const reaction_totalIncr = parseInt(reactionTotal) + 1;
      const reaction_totalDecr = parseInt(reactionTotal) - 1;

      const res = await fetch(
        FETCH_URL + "videos/react/" + myuserid + "/" + videoId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authentication: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify({
            reaction_totalIncr,
            reaction_totalDecr,
            myuserid,
            videoId,
          }),
        }
      );
    } catch (error) {
      throw Error(error);
    }
  };

  return (
    <>
      <h3>Mes vidéos</h3>

      <div className="mytracker-galery">
        {!videos ? (
          <>
            <p>Contenu en chargement, patientez</p>
          </>
        ) : (
          videos.map((video) => {
            const elapsed = timeElapsed(video.publication_date);

            return (
              <div key={video.video_id}>
                <figure>
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
                      <strong>{video.pseudo}</strong>{" "}
                      <FontAwesomeIcon icon={faRecordVinyl} size="xs" />{" "}
                      {video.trick_name}
                    </p>
                    {!elapsed ? (
                      <></>
                    ) : (
                      <>
                        <p>
                          <FontAwesomeIcon icon={faCheck} size="xs" />{" "}
                          {elapsed.times}
                        </p>
                      </>
                    )}

                    <AddComment key={video.video_id} videoId={video.video_id} />
                  </figcaption>
                </figure>
              </div>
            );
          })
        )}

        <p className="galery_end">Fin de la liste</p>
        <p className="galery_end">
          Continue à progresser et montre nous tes tricks en video !
        </p>
      </div>
    </>
  );
}

export default MyVideos;
