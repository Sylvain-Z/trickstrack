import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function UploadSucceded() {


  const { info } = useSelector((state) => state.user);

  return (
    <>
      <section className="uploadsucceded">
        <h2 className="uploadsucceded-title">Téléchargement Réussi !</h2>

        {info.id === "Invite" ? (
          <><p className="button_ctn logs-profil">
          <Link to={`/galerie`}>
            Mon tracker
          </Link>
        </p></>
        ) : (
          <>
            <p className="button_ctn logs-profil">
              <Link to={`/utilisateurs/mon-tracker/${info.id}`}>
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
