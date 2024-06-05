import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

// import { FETCH_URL } from "../../../../Assets/Variables/const"; // pour version API ------------
import { setItemWithExpiration } from "../../../../Assets/Variables/functions"; // pour version API ------

// import { signin } from "../../../../store/slices/user";

function Form({ type }) {

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newUserId, setnewUserId] = useState(uuidv4().slice(0, 16)); // à chaque chargement du composant une chaine de 16 caractères aléatoire sera stocké // SIGNUP

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");
  const [msg2, setMsg2] = useState("");
  const [msg3, setMsg3] = useState("");

  
  // code démo version statique (hébergement sans BDD) ++++++++++++++++++++++++++
  async function handleSubmit(e) {
    e.preventDefault();

    if (type === "in") {
      setMsg("Application non connecté à une base de données");
      setItemWithExpiration('fakeauth', "juste pour la démo", 10080);
      navigate("/galerie");
    }
    if (type === "up") {
      setMsg("Application non connecté à une base de données");
    }
  };

  // Fonction de connection lorsque l'Application est reliée à une Base de données --------
  // --------------------------------------------------------------------------------------
  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   const res = await fetch(FETCH_URL + "users/sign" + type, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ newUserId, pseudo, email, password }),
  //   });
  //   const json = await res.json();
  //   setMsg(json.msg);
  //   setMsg2(json.msg2);
  //   setMsg3(json.msg3);

  //   if (type === "in" && res.status === 200) {
      
  //       setItemWithExpiration("auth", json.TOKEN, 10080);
  //       dispatch(signin({ id : json.userId }));
  //       navigate("/utilisateurs/mon-tracker/" + json.userId);
      
  //   }
  //   if (type === "up" && res.status === 201) {
  //     navigate("/utilisateurs/connexion");
  //   }
  // };


  return (
    <>
      <section className="form-ctn">
        {type === "in" ? (
          <>
            <h2 className="form-title">Connectez vous</h2>

            {msg && <p className="msg red">{msg}</p>}
            {msg2 && <p className="msg green">{msg2}</p>}
          </>
        ) : (
          <>
            <h2 className="form-title">Créez votre compte</h2>

            {msg && <p className="msg red">{msg}</p>}
            {msg2 && <p className="msg green">{msg2}</p>}
            {msg3 && (<p className="msg yellow"><Link to="/utilisateurs/connexion" className="msg_yellow">{msg3}</Link></p>)}
          </>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="pseudo">Adresse Mail</label>
          <input
            required
            placeholder="Votre email"
            type="email" // vérification du format de l'entrée de l'utilisateur côté server
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {type === "up" && (
            <>
              <input
                placeholder="ID du client"
                type="hidden"
                name="id"
                value={newUserId}
                onChange={(e) => setnewUserId(e.target.value)}
              />
              <label htmlFor="pseudo">Pseudo</label>
              <input
                required
                placeholder="Votre pseudo"
                type="text"
                name="pseudo"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
            </>
          )}

          <label htmlFor="pseudo">Mot de passe</label>
          <input
            required
            placeholder="Votre mot de passe"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">
            {type === "in" ? "Se connecter" : "S'enregistrer"}
          </button>
        </form>
        {type === "in" && (
          <>
            <p className="advise advise_top">Pas encore de compte ?</p>
            <p className="advise">
              Vous pouvez{" "}
              <Link to="/utilisateurs/creer-un-compte">
                <span className="purple overline">en créer un</span>.
              </Link>
            </p>
          </>
        )}
        {type === "up" && (
          <>
            <p className="advise advise_top">Vous avez déjà un compte ?</p>
            <p className="advise">
              Connectez vous{" "}
              <Link to="/utilisateurs/connexion">
                <span className="purple overline">ici</span>.
              </Link>
            </p>
          </>
        )}
      </section>
    </>
  );
}

export default Form;