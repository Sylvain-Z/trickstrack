import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FETCH_URL } from "../../../../Assets/Variables/const";
import { getItemWithExpiration } from "../../../../Assets/Variables/functions";

import { signout } from "../../../../store/slices/user";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserXmark } from "@fortawesome/free-solid-svg-icons";

function DeleteAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const TOKEN = getItemWithExpiration("auth");
  const { info } = useSelector((state) => state.user);
  const [id, setId] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer votre profil ?"
    );
    if (confirmed) {
      const res = await fetch(FETCH_URL + "users/delete/" + info.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ id: info.id }),
      });
      const json = await res.json();
      setMsg(json.msg);

      if (res.status === 201) {
        localStorage.removeItem("auth");
        dispatch(signout(id));
        navigate(`/`);
      }
    }
  }

  return (
    <>
      <h3>Supprimer mon compte</h3>

      <p className="myinformations-bio red">
        Attention cette action est irréversible. Toute votre progression, vos videos et vos commentaires seront supprimé.
      </p>

      <form onSubmit={handleSubmit}>
        {msg && <p className="green non-absolute">{msg}</p>}
        <button className="dangerZone non-absolute" type="submit">
          <FontAwesomeIcon icon={faUserXmark} size="xl" className="icon" />
        </button>
      </form>
    </>
  );
}

export default DeleteAccount;
