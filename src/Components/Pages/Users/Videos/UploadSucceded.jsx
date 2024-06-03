import { Link } from "react-router-dom";

import { getItemWithExpiration } from "../../../../Assets/Variables/functions";

function UploadSucceded() {

  const myuserid = getItemWithExpiration("myuserid");

  return (
    <>
      <section className="uploadsucceded">
        <h2 className="uploadsucceded-title">Téléchargement Réussi !</h2>

        {!myuserid ? (
          <><p className="button_ctn logs-profil">
          <Link to={`/galerie`}>
            Mon tracker
          </Link>
        </p></>
        ) : (
          <>
            <p className="button_ctn logs-profil">
              <Link to={`/utilisateurs/mon-tracker/${myuserid}`}>
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
