import { useState } from "react";
import { useSelector } from "react-redux";

import { FETCH_URL } from "../../../../Assets/Variables/const";
import { getItemWithExpiration } from "../../../../Assets/Variables/functions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

function UpdateSecurity() {
    
  const TOKEN = getItemWithExpiration("auth");
  const { info } = useSelector((state) => state.user);

  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(FETCH_URL + "users/update-password/" + info.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ password, id: info.id }),
    });
    const json = await res.json();
    setMsg(json.msg);
  }

  return (
    <>
      <h3>Modifier mot de passe</h3>

      <div className="myinformations myinformations-update">
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            placeholder="Modifier mot de passe"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          {msg && <p className="green non-absolute">{msg}</p>}

          <button className="myinformations-btn non-absolute" type="submit">
            <FontAwesomeIcon icon={faCheckSquare} size="xl" className="icon" />
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateSecurity;
