import { timeElapsed } from "../../../Assets/Variables/functions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRecordVinyl,
  faFaceSmile,
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
              <div key={video.video_id} className="video-display">
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
                        <p>{elapsed.times}</p>
                      </>
                    )}

                    <AddComment
                      video={video}
                      addReaction={addReaction}
                    />
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
