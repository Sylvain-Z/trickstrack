import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

import ReadAllComments from "./ReadAllComments";

// import { FETCH_URL } from "../../../Assets/Variables/const"; // pour version API  ---------------------
import { getItemWithExpiration } from "../../../Assets/Variables/functions";

import { comments } from "./Comments"; // code démo version statique (hébergement sans BDD) ++++++++++

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowUp,
  faCircleUser,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";

function AddComment({ videoId }) {
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
    console.log("videoId", videoId);

    if (videoId !== undefined && videoId !== null) {
      const filteredComments = comments.filter(
        (comment) => comment.video_id == videoId
      );
      if (filteredComments.length > 0) {
        const recentComment = filteredComments.reduce((latest, current) => {
          return latest.id > current.id ? latest : current;
        }, filteredComments[0]);

        console.log("recentComment", recentComment);
        setLastComment([recentComment]);
      } else {
        setLastComment([]);
      }
    }
  }, [videoId]);

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
    }
  }

  // Code fetch API Node JS ------------------------------------------
  // useEffect(() => {
  //   async function getLastComment() {
  //     try {
  //       const comment = await fetch(
  //         FETCH_URL + "/comments/last-comment/" + videoId,
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

  // const { info } = useSelector((state) => state.user);
  // const TOKEN = getItemWithExpiration('auth');

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
  //         body: JSON.stringify({ comment, userId: info.id , videoId }),
  //       });
  //       setComment("");
  //     }
  //   }
  // };

  return (
    <>
      <form className="video-comment" onSubmit={addComment}>
        <div className="comment-btn-div static">
          <button
            type="button"
            onClick={openModal}
            className="commentpicto gold static"
          >
            <FontAwesomeIcon icon={faComment} size="lg" />
          </button>
          <button type="button" className="commentpicto gold static">
            <FontAwesomeIcon icon={faLink} size="lg " />
          </button>
        </div>

        {/* POPUP */}
        <ReadAllComments
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          videoId={videoId}
        />

        {msg && <p>{msg}</p>}

        <div className="input-div">
          <input
            placeholder="Ajoute un commentaire"
            type="text"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">
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
