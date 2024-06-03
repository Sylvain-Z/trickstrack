import { useState, useEffect } from "react";

import { FETCH_URL } from "../../../../Assets/Variables/const"; // pour version API
import { getItemWithExpiration } from "../../../../Assets/Variables/functions"; // pour version API

import UpdateInfos from "./UpdateInfos";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function MyInfos() {
  const [user, setUser] = useState(null);
  const myuserid = getItemWithExpiration("myuserid");
  const TOKEN = getItemWithExpiration("auth");

  const [editIsActiv, setEditIsActiv] = useState(false);
  const toggleEditIsActiv = () => {
    setEditIsActiv(preveditIsActiv => !preveditIsActiv);
  };

  // Récupère l'id du user connecté pour l'envoyer dans la mise à jour d'un nombre de réaction
  useEffect(() => {
    async function getUserInfos() {
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
    getUserInfos();
  }, []);

  return (
    <>
      <h3>Mes informations</h3>

      {!user ? (
        <></>
      ) : (
        <>
          <p className="myinformations-bio">Bio : {user[0].bio}</p>

          <div className="myinformations">
            <img src="../../../Assets/" alt="" />

            <p className="myinformations-pseudo">{user[0].pseudo}</p>
            <p className="myinformations-email">{user[0].email}</p>
            <p className="myinformations-trickstrack">TricksTrack</p>


            <button
                className="button_ctn update myinformations-btn"
                type="button"
                onClick={toggleEditIsActiv}
              >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  size="xl"
                  className="icon"
                />
              </button>
          </div>
        </>
      )}

      {!editIsActiv ? (
        <></>
      ) : (
        <>{!user ? <></> : <UpdateInfos user={user[0]} />}</>
      )}
    </>
  );
}

export default MyInfos;
