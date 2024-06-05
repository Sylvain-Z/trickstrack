import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { FETCH_URL } from "../../../../Assets/Variables/const"; // pour version API
import { getItemWithExpiration } from "../../../../Assets/Variables/functions"; // pour version API

import UpdateInfos from "./UpdateInfos";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function MyInfos() {


  const [user, setUser] = useState(null);
  const TOKEN = getItemWithExpiration("auth");
  const { info } = useSelector((state) => state.user);

  const [editIsActiv, setEditIsActiv] = useState(false);
  const toggleEditIsActiv = () => {
    setEditIsActiv(preveditIsActiv => !preveditIsActiv);
  };

  useEffect(() => {
    async function getUserInfos() {
      try {
        const user = await fetch(FETCH_URL + "users/" + info.id, {
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
                className="myinformations-btn"
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
