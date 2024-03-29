import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FETCH_URL } from "../../../../Assets/Variables/const"; // pour version API
import { getItemWithExpiration } from "../../../../Assets/Variables/functions"; // pour version API

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function MyInfos() {
  const [user, setUser] = useState(null);
  const myuserid = getItemWithExpiration("myuserid");
  const TOKEN = getItemWithExpiration("auth");

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
      <h3>Mes informations</h3>

      <div className="myinformations">
        {!user ? (
          <></>
        ) : (
          <>
            <img src="../../../Assets/" alt="" />

            <p className="myinformations-pseudo">{user[0].pseudo}</p>
            <p className="myinformations-email">{user[0].email}</p>
            <p className="myinformations-trickstrack">TricksTrack</p>

            <p className="button_ctn update myinformations-btn">
              <Link to={``}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  size="xl"
                  className="icon"
                />
              </Link>
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default MyInfos;
