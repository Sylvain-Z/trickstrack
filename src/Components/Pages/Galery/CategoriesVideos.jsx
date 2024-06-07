import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

// import { FETCH_URL } from "../../../Assets/Variables/const"; // pour version API
import { getItemWithExpiration } from "../../../Assets/Variables/functions";

import { categories } from "../../../Assets/Variables/categories"; // code démo version statique (hébergement sans BDD) ++++++++++++++++++++++++++
import { tricksList } from "../../../Assets/Variables/tricks"; // code démo version statique (hébergement sans BDD) ++++++++++++++++++++++++++
import { galery } from "../../../Assets/Variables/galery"; // code démo version statique (hébergement sans BDD) ++++++++++++++++++++++++++

import VideosDisplay from "../../Containers/VideosDisplay/VideosDisplay";

function Categories() {
  // code démo version statique (hébergement sans BDD) ++++++++++++++++++++++++++

  const [categorieSelected, setCategorieSelected] = useState("");
  const [tricks, setTricks] = useState([]);
  const [tricks_selected, setTricks_selected] = useState("");
  const [videos, setVideos] = useState([]);
  const [msg, setMsg] = useState("");

  const FAKETOKEN = getItemWithExpiration("fakeauth");

  useEffect(() => {
    async function getTricksByCategorie() {
      try {
        if (categorieSelected === "") {
          setVideos([]);
          setTricks([]);
          setTricks_selected("");
        } else {
          const filteredTricks = tricksList.filter(
            (trick) => trick.label == categorieSelected
          );
          setTricks(filteredTricks);

          if (tricks_selected === "") {
            setVideos([]);
          } else {
            const filteredVideos = galery.filter(
              (video) => video.trick_name == tricks_selected
            );
            setVideos(filteredVideos);
          }

        }
      } catch (error) {
        throw Error(error);
      }
    }
    getTricksByCategorie();
  }, [categorieSelected, tricks_selected, videos]);

  useEffect(() => {
    async function getVideosByTrickName() {
      try {

      } catch (error) {
        throw Error(error);
      }
    }
    getVideosByTrickName();
  }, [tricks_selected, videos]);

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

  // const [categories, setCategories] = useState([]);
  // const [categorieSelected, setCategorieSelected] = useState("");
  // const [tricks, setTricks] = useState([]);
  // const [tricks_selected, setTricks_selected] = useState("");
  // const [videos, setVideos] = useState([]);

  // const [msg, setMsg] = useState("");
  // const { info } = useSelector((state) => state.user);
  // const TOKEN = getItemWithExpiration("auth");

  // useEffect(() => {
  //   async function getCategories() {
  //     try {
  //       const categories = await fetch(FETCH_URL + "tricks/categories", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       if (categories.status === 200) {
  //         const json = await categories.json();
  //         setCategories(json);
  //       }
  //     } catch (error) {
  //       throw Error(error);
  //     }
  //   }
  //   getCategories();
  // }, []);

  // useEffect(() => {
  //   async function getTricksByCategorie() {
  //     try {
  //       if (categorieSelected === "") {
  //         setVideos([]);
  //         setTricks([]);
  //         setTricks_selected("");
  //       } else {
  //         const tricks = await fetch(
  //           FETCH_URL + "tricks/tricksByCategories/" + categorieSelected,
  //           {
  //             method: "GET",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //           }
  //         );
  //         if (tricks.status === 200) {
  //           const json = await tricks.json();
  //           setTricks(json);
  //         }
  //       }
  //     } catch (error) {
  //       throw Error(error);
  //     }
  //   }
  //   getTricksByCategorie();
  // }, [categorieSelected]);

  // useEffect(() => {
  //   // récupère toutes les vidéos trié dans l'ordre par ordre anté chronologique
  //   async function getVideosByTrickName() {
  //     try {
  //       if (tricks_selected === "") {
  //         setVideos([]);
  //       } else {
  //         const videos = await fetch(
  //           FETCH_URL + "videos/trick/" + tricks_selected,
  //           {
  //             method: "GET",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //           }
  //         );
  //         if (videos.status === 200) {
  //           const json = await videos.json();
  //           setVideos(json);
  //         } else {
  //           setVideos([]);
  //         }
  //       }
  //     } catch (error) {
  //       throw Error(error);
  //     }
  //   }
  //   getVideosByTrickName();
  // }, [tricks_selected, videos]);

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
  //       const res = await fetch(
  //         FETCH_URL + "videos/react/" + info.id + "/" + videoId,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authentication: `Bearer ${TOKEN}`,
  //           },
  //           body: JSON.stringify({
  //             reaction_totalIncr,
  //             reaction_totalDecr,
  //             userId: info.id,
  //             videoId,
  //           }),
  //         }
  //       );
  //     }
  //   } catch (error) {
  //     throw Error(error);
  //   }
  // };

  return (
    <>
      <section className="galery-ctn">
        <h2 className="galery-title">Selectionne une catégorie</h2>

        <form>
          <select
            name="categories"
            onChange={(e) => setCategorieSelected(e.target.value)}
          >
            <option value="">Catégorie</option>
            {!categories.length ? (
              <></>
            ) : (
              categories.map((categorie) => (
                <>
                  <option key={categorie.id} value={categorie.label}>
                    {categorie.label}
                  </option>
                </>
              ))
            )}
          </select>

          <select
            name="tricks"
            onChange={(e) => setTricks_selected(e.target.value)}
          >
            <option value="">Tricks</option>
            {!tricks.length ? (
              <></>
            ) : (
              tricks.map((trick) => (
                <>
                  <option key={trick.id} value={trick.name}>
                    {trick.name}
                  </option>
                </>
              ))
            )}
          </select>
        </form>

        <VideosDisplay videos={videos} addReaction={addReaction} msg={msg} />
      </section>
    </>
  );
}

export default Categories;
