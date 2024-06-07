import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { FETCH_URL } from "../../../../Assets/Variables/const";
import { getItemWithExpiration } from "../../../../Assets/Variables/functions";

import VideosDisplay from '../../../Containers/VideosDisplay/VideosDisplay';

function MyVideos() {

  const [videos, SetVideos] = useState(null);

  const { info } = useSelector((state) => state.user);
  const TOKEN = getItemWithExpiration("auth");

  // récupère les vidéos de l'utilisateur connecté
  useEffect(() => {
    async function getUserVideos() {
      try {
        const videos = await fetch(FETCH_URL + "videos/" + info.id, {
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

      await fetch(
        FETCH_URL + "videos/react/" + info.id + "/" + videoId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authentication: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify({
            reaction_totalIncr,
            reaction_totalDecr,
            userId : info.id,
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

      <VideosDisplay videos={videos} addReaction={addReaction}/>
    </>
  );
}

export default MyVideos;
