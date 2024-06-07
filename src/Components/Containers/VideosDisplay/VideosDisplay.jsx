import { timeElapsed } from "../../../Assets/Variables/functions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRecordVinyl,
  faFire,
  faFaceSmile,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import AddComment from "../../Pages/Comments/AddComment"

function VideosDisplay({videos, addReaction, msg}) {

  return (
    <>

      <div className="galery">
        {!videos ? (
          <>
            <p>Contenu en chargement, patientez</p>
          </>
        ) : (
          videos.map((video) => {
            const elapsed = timeElapsed(video.publication_date);

            return (
              <div key={video.video_id}>
                <figure>
                  <video className="galery-video" controls>
                    <source
                      src={"/Videos/" + video.title}
                      controls
                      type="video/mp4"
                    />
                  </video>
                  <figcaption>
                    {msg && <p className="msg red">{msg}</p>}
                   <button onClick={() => addReaction(video.reaction_total, video.video_id)}> {/* ligne démo // pour version API --------- */}
                     {/* <button onClick={() => addReaction(video.video_id)}> */} {/* ligne démo version statique (hébergement sans BDD) ++++++++++++++++++ */}
                      <FontAwesomeIcon icon={faFire} size="lg" />{" "}
                      {video.reaction_total}
                    </button>
                    <p>
                      <FontAwesomeIcon icon={faFaceSmile} size="xs" />{" "}
                      <strong>{video.pseudo}</strong>{" "}
                      <FontAwesomeIcon icon={faRecordVinyl} size="xs" />{" "}
                      {video.trick_name}
                    </p>
                    {!elapsed ? (
                      <></>
                    ) : (
                      <>
                        <p>
                          <FontAwesomeIcon icon={faCheck} size="xs" />{" "}
                          {elapsed.times}
                        </p>
                      </>
                    )}
                    <AddComment key={video.video_id} videoId={video.video_id} />
                  </figcaption>
                </figure>
              </div>
            );
          })
        )}

        <p className="galery_end">Fin de la liste</p>
        <p className="galery_end">
          Continue à progresser et montre nous tes tricks en video !
        </p>
      </div>
    </>
  );
}

export default VideosDisplay;
