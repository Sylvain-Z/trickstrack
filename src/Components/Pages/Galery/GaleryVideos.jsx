import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

// import { FETCH_URL } from "../../../Assets/Variables/const"; // pour version API
import { getItemWithExpiration } from "../../../Assets/Variables/functions";

import VideosDisplay from "../../Containers/VideosDisplay/VideosDisplay";

import { galery } from "../../../Assets/Variables/galery"; // variables js pour démo version statique (hébergement sans BDD)

function GaleryVideos() {
  const params = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params]);

  // code démo version statique (hébergement sans BDD) ++++++++++++++++++++++++++
  // Simule l'ajout et le retrait d'une réaction
  const [videos, setVideos] = useState(galery.map((item) => ({ ...item })));
  const [msg, setMsg] = useState("");

  const FAKETOKEN = getItemWithExpiration("fakeauth");

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
  };

  // Code fetch API Node JS ------------------------------------------
  // const [videos, setVideos] = useState(null);

  // const [msg, setMsg] = useState("");
  // const { info } = useSelector((state) => state.user);
  // const TOKEN = getItemWithExpiration("auth");

  // useEffect(() => {
  //   // récupère toutes les vidéos trié dans l'ordre par ordre anté chronologique
  //   async function getGaleryVideos() {
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
  //   getGaleryVideos();
  // }, [videos]);

  // async function addReaction(reactionTotal, videoId) {
  //   // met à jour le nombre de réactions concernant la vidéo concernée
  //   try {
  //     const reaction_totalIncr = parseInt(reactionTotal) + 1;
  //     const reaction_totalDecr = parseInt(reactionTotal) - 1;

  //     if (!TOKEN) {
  //       // si l'utilisateur n'est pas connecté à un compte il ne peut pas ajouter de réaction

  //       setMsg("Compte utilisateur requis");

  //       setTimeout(() => {
  //         setMsg("");
  //       }, 3000);
  //     } else {
  //       // si l'utilisateur est connecté à un compte peut ajouter ou retirer une réaction
  //       await fetch(FETCH_URL + "videos/react/" + info.id + "/" + videoId, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authentication: `Bearer ${TOKEN}`,
  //         },
  //         body: JSON.stringify({
  //           reaction_totalIncr,
  //           reaction_totalDecr,
  //           userId: info.id,
  //           videoId,
  //         }),
  //       });
  //     }
  //   } catch (error) {
  //     throw Error(error);
  //   }
  // };

  return (
    <>
      <VideosDisplay videos={videos} addReaction={addReaction} msg={msg} />
    </>
  );
}

export default GaleryVideos;
