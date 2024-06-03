import { useState } from "react";

import { FETCH_URL } from "../../../../Assets/Variables/const"; // pour version API
import { getItemWithExpiration } from "../../../../Assets/Variables/functions"; // pour version API

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

function UpdateInfos({ user }) {

  const [pseudo, setPseudo] = useState(user.pseudo);
  const [firstname, setFirstname] = useState(user.firstname);
  const [bio, setBio] = useState(user.bio);
  const [email, setEmail] = useState(user.email);
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    
    const TOKEN = getItemWithExpiration("auth");
    
    const res = await fetch(FETCH_URL + "users/update/" + user.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authentication" : `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ pseudo, firstname, bio, email, id: user.id }),
    });
    const json = await res.json();
    setMsg(json.msg);
  }

  return (
    <>
      <h3>Modifier mes informations</h3>

      <div className="myinformations myinformations-update">
        <form onSubmit={handleSubmit}>
          <label htmlFor="pseudo">Pseudo</label>
          <input
            type="text"
            name="pseudo"
            value={pseudo}
            onChange={(e) => {
              setPseudo(e.target.value);
            }}
          />
          <label htmlFor="firstname">Prénom</label>
          <input
            type="text"
            name="firstname"
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          />
          <label htmlFor="bio">Bio (200 caractères max)</label>
          <textarea
            type="text"
            name="bio"
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
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

export default UpdateInfos;
