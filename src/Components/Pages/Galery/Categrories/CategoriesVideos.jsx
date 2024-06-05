import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// import { FETCH_URL } from "../../../../Assets/Variables/const"; // pour version API
import { getItemWithExpiration } from "../../../../Assets/Variables/functions";
import { timeElapsed } from "../../../../Assets/Variables/functions";

import { galery } from "../Galery"; // variables js pour démo version statique (hébergement sans BDD)

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRecordVinyl,
  faFire,
  faFaceSmile,
  faCheck,
  faFilm,
} from "@fortawesome/free-solid-svg-icons";

import AddComment from "../../Comments/AddComment";

function CategoriesVideos({ trick_name }) {
  const params = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params]);

  // code démo version statique (hébergement sans BDD) ++++++++++++++++++++++++++
  // Simule l'ajout et le retrait d'une réaction

    const [videos, setVideos] = useState([]);
    const [msg, setMsg] = useState("");

    const FAKETOKEN = getItemWithExpiration("fakeauth");

    useEffect(() => {
      if (trick_name === "") {
        setVideos([]);
      } else {
        const filteredGalery = galery.filter((g) => g.trick_name == trick_name);
        setVideos(filteredGalery);
      }
    }, [trick_name]);

  
    function addReaction(id) {
      if (!FAKETOKEN) {
        setMsg("Compte utilisateur requis");
      } else {
        setVideos((prevVideos) =>
          prevVideos.map((video) =>
            video.video_id === id
              ? {
                  ...video,
                  reaction_total: video.reaction_total + (video.clicked ? -1 : 1),
                  clicked: !video.clicked,
                }
              : video
          )
        );
      }
    }

  // Code fetch API Node JS ------------------------------------------
  // const [videos, setVideos] = useState([]);

  // const [msg, setMsg] = useState("");
  // const { info } = useSelector((state) => state.user);
  // const TOKEN = getItemWithExpiration("auth");

  // useEffect(() => {
  //     // récupère toutes les vidéos trié dans l'ordre par ordre anté chronologique
  //     async function getGaleryVideos() {
  //     try {
  //         const videos = await fetch(FETCH_URL + "videos/trick/"+ trick_name, {
  //         method: "GET",
  //         headers: {
  //             "Content-Type": "application/json",
  //         },
  //         });
  //         if (videos.status === 200) {
  //         const json = await videos.json();
  //         setVideos(json);
  //         }
  //     } catch (error) {
  //         throw Error(error);
  //     }
  //     }
  //     getGaleryVideos();
  // }, [videos]);

  // async function addReaction(reactionTotal, videoId) {
  //     // met à jour le nombre de réactions concernant la vidéo concernée
  //     try {
  //     const reaction_totalIncr = parseInt(reactionTotal) + 1;
  //     const reaction_totalDecr = parseInt(reactionTotal) - 1;

  //     if (!TOKEN) {
  //         // si l'utilisateur n'est pas connecté à un compte il ne peut pas ajouter de réaction

  //         setMsg("Compte utilisateur requis");

  //         setTimeout(() => {
  //         setMsg("");
  //         }, 3000);
  //     } else {
  //         // si l'utilisateur est connecté à un compte peut ajouter ou retirer une réaction
  //         const res = await fetch(
  //         FETCH_URL + "videos/react/" + info.id  + "/" + videoId,
  //         {
  //             method: "POST",
  //             headers: {
  //             "Content-Type": "application/json",
  //             Authentication: `Bearer ${TOKEN}`,
  //             },
  //             body: JSON.stringify({
  //             reaction_totalIncr,
  //             reaction_totalDecr,
  //             userId : info.id,
  //             videoId,
  //             }),
  //         }
  //         );
  //     }
  //     } catch (error) {
  //     throw Error(error);
  //     }
  // };

  return (
    <>
      <div className="galery">
        {!videos.length ? (
          <>
            <FontAwesomeIcon
              icon={faFilm}
              size="2xl"
              style={{ marginBottom: 50, marginTop: 50 }}
            />
            <p>
              Aucune video pour cette catégorie, réalise et partage nous la
              tienne !
            </p>
          </>
        ) : (
          videos.map((video) => {
            const elapsed = timeElapsed(video.publication_date);

            return (
              <>
                <div key={video.video_id}>
                  <figure>
                    <video className="galery-video" controls>
                      <source
                        src={"/Videos/" + video.title}
                        controls
                        type="video/mp4"
                      />
                    </video>
                    <figcaption>
                        {/* {msg && <p className="msg red">{msg}</p>} */}{/* ligne démo // pour version API --------- */}
                        {/* <button onClick={() => addReaction(video.reaction_total, video.video_id)}>*/}{/* ligne démo // pour version API --------- */}
                        <button onClick={() => addReaction(video.video_id)}> {/* ligne démo version statique (hébergement sans BDD) ++++++++++++++++++ */}
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
                        <AddComment
                            key={video.video_id}
                            videoId={video.video_id}
                        />
                    </figcaption>
                  </figure>
                </div>
              </>
            );
          })
        )}
      </div>
    </>
  );
}

export default CategoriesVideos;
