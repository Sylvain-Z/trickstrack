import { useState, useEffect } from "react";

// import { FETCH_URL } from "../../../../Assets/Variables/const"; // pour version API

import { categories } from "./categories"; // code démo version statique (hébergement sans BDD) ++++++++++++++++++++++++++
import { tricksList } from "./tricks"; // code démo version statique (hébergement sans BDD) ++++++++++++++++++++++++++

import CategoriesVideos from "./CategoriesVideos";

function Categories() {
  // code démo version statique (hébergement sans BDD) ++++++++++++++++++++++++++

  const [categorieSelected, setCategorieSelected] = useState("");
  const [tricks, setTricks] = useState([]);
  const [tricks_selected, setTricks_selected] = useState("");

  useEffect(() => {
    async function getTricksByCategorie() {
      try {
        if (categorieSelected === "") {
          setTricks([]);
        } else {
          const filteredTricks = tricksList.filter(
            (trick) => trick.label == categorieSelected
          );
          setTricks(filteredTricks);
        }
      } catch (error) {
        throw Error(error);
      }
    }
    getTricksByCategorie();
  }, [categorieSelected]);

  // Code fetch API Node JS ------------------------------------------

  // const [categories, setCategories] = useState([]);
  // const [categorieSelected, setCategorieSelected] = useState("");
  // const [tricks, setTricks] = useState([]);
  // const [tricks_selected, setTricks_selected] = useState("");
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
  //         setTricks([]);
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

        <CategoriesVideos trick_name={tricks_selected} />
      </section>
    </>
  );
}

export default Categories;
