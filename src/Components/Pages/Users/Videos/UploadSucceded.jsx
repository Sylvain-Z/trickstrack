import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { FETCH_URL } from "../../../../Assets/Variables/const";
import { getItemWithExpiration } from "../../../../Assets/Variables/functions";

function UploadSucceded() {
  const [user, setUser] = useState(null);

  const myuserid = getItemWithExpiration("myuserid");
  const TOKEN = getItemWithExpiration("auth");

  // Récupère l'id du user connecté pour l'envoyer dans l'upload de la vidéo
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
          setUser(json);
        }
      } catch (error) {
        throw Error(error);
      }
    }
    getData();
  }, []);

  return (
    <>
      <section className="uploadsucceded">
        <h2 className="uploadsucceded-title">Téléchargement Réussi !</h2>

        {!user ? (
          <><p className="button_ctn logs-profil">
          <Link to={`/galerie`}>
            Mon tracker
          </Link>
        </p></>
        ) : (
          <>
            <p className="button_ctn logs-profil">
              <Link to={`/utilisateurs/mon-tracker/${user[0].id}`}>
                Mon tracker
              </Link>
            </p>
          </>
        )}
      </section>
    </>
  );
}

export default UploadSucceded;
