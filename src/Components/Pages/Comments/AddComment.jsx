import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// import { FETCH_URL } from "../../../Assets/Variables/const"; // pour version API  ---------------------
import { getItemWithExpiration } from "../../../Assets/Variables/functions";

import ReadAllComments from "./ReadAllComments";
import CopyToClipboardButton from '../../Containers/CopyToClipboardButton/CopyToClipboardButton';

import { comments } from "../../../Assets/Variables/comments"; // code démo version statique (hébergement sans BDD) ++++++++++

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowUp,
  faCircleUser,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";

function AddComment({ video, addReaction }) {
  
  // const [userReaction, setUserReaction] = useState("");
  const [lastComment, setLastComment] = useState([]);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");
  
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  // code démo version statique (hébergement sans BDD) ++++++++++++++++++++++++++

  useEffect(() => {

    if (video.video_id !== undefined && video.video_id !== null) {
      const filteredComments = comments.filter(
        (comment) => comment.video_id == video.video_id
      );
      if (filteredComments.length > 0) {
        const recentComment = filteredComments.reduce((latest, current) => {
          return latest.id > current.id ? latest : current;
        }, filteredComments[0]);
        
        setLastComment([recentComment]);
      } else {
        setLastComment([]);
      }
    }
  }, [video]);

  const FAKETOKEN = getItemWithExpiration("fakeauth");

  async function addComment(e) {
    e.preventDefault();

    if (!FAKETOKEN) {
      setMsg("Vous devez être connecté pour laisser un commentaire");
    } else {
      setLastComment([
        {
          id: 2,
          comment: comment,
          publication_date: "2024-06-02T20:53:44.000Z",
          user_id: "9d2f000e-52ce-41",
          video_id: 2,
          pseudo: "testeur-demo",
        },
      ]);
      setComment("");
    }
  };

  // Code fetch API Node JS ------------------------------------------
  // useEffect(() => {
  //   async function getLastComment() {
  //     try {
  //       const comment = await fetch(
  //         FETCH_URL + "comments/last-comment/" + video.video_id,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (comment.status === 200) {
  //         const json = await comment.json();
  //         setLastComment(json);
  //       }
  //     } catch (error) {
  //       throw Error(error);
  //     }
  //   }
  //   getLastComment();
  // }, [lastComment]);

  // useEffect(() => {
  //   async function getUserReaction() {
  //     try {
  //       const reaction = await fetch(FETCH_URL + "videos/reaction/" + info.id + "/" + video.video_id,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (reaction.status === 200) {
  //         const json = await reaction.json();
  //         setUserReaction(json);
  //       }
  //     } catch (error) {
  //       throw Error(error);
  //     }
  //   }
  //   getUserReaction();
  // }, [userReaction, addReaction]);

  // const { info } = useSelector((state) => state.user);
  // const TOKEN = getItemWithExpiration("auth");

  // async function addComment(e) {
  //   e.preventDefault();
  //   if (!comment) {
  //     setMsg("Ecrivez quelque chose.");
  //     setInterval(() => {
  //       setMsg("");
  //     }, 5000);
  //   } else {
  //     if (!TOKEN) {
  //       setMsg("Vous devez être connecté pour laisser un commentaire");
  //     } else {
  //       await fetch(FETCH_URL + "comments/add-comment", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authentication: `Bearer ${TOKEN}`,
  //         },
  //         body: JSON.stringify({ comment, userId: info.id, videoId : video.video_id }),
  //       });
  //       setComment("");
  //     }
  //   }
  // };

  return (
    <>
      <form className="video-comment" onSubmit={addComment}>

        <div className="comment-btn-div">

          {/*<button
            type="button"
            onClick={() => addReaction(video.reaction_total, video.video_id)}
            className={!userReaction ? "gold" : "orange"}>*/}  {/* ligne démo // pour version API --------- */}
          <button 
            type="button"
            onClick={() => addReaction(video.video_id)}
            className={video.clicked ? "orange" : "gold"}> {/* ligne démo version statique (hébergement sans BDD) ++++++++++++++++++ */}
              <FontAwesomeIcon icon={faFire} size="lg" />{" "}
              {video.reaction_total}
          </button>

          <button
            type="button"
            onClick={openModal}
            className="gold"
          >
            <FontAwesomeIcon icon={faComment} size="lg" />
          </button >
          <CopyToClipboardButton videoId={video.video_id} />
          {/* POPUP */}
          <ReadAllComments
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          videoId={video.video_id} 
          />
        </div>

        {msg && <p className="msg red">{msg}</p>}

        <div className="input-div">
          <textarea
            placeholder="Ajoute un commentaire"
            type="text"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit" className="send-comment-btn">
            <FontAwesomeIcon icon={faCircleArrowUp} size="xl" />
          </button>
        </div>
        {!lastComment.length ? (
          <>
            <p className="last-comment">Aucun commentaire pour le moment</p>
          </>
        ) : (
          <>
            <p className="last-comment" onClick={openModal}>
              <FontAwesomeIcon icon={faCircleUser} size="xs" />{" "}
              <strong>{lastComment[0].pseudo}</strong>{" "}
              {truncateText(lastComment[0].comment, 75)}
            </p>
          </>
        )}
      </form>
    </>
  );
}

export default AddComment;
