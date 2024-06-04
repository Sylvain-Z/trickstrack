import React from "react";
import Modal from "react-modal";
import { useEffect, useState } from "react";

// import { FETCH_URL } from "../../../Assets/Variables/const"; // pour version API
import { timeElapsed } from "../../../Assets/Variables/functions";

import { comments } from "./Comments"; // code démo version statique (hébergement sans BDD) ++++++++++

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCircleUser } from "@fortawesome/free-solid-svg-icons";

import TruncatedText from "./TruncatedText";

const customStyles = {
  content: {
    height: "400px",
    top: "auto",
    bottom: "0",
    left: "50%",
    right: "auto",
    marginRight: "-50%",
    padding: "25px",
    border: "none",
    transform: "translate(-50%, 0)",
    background: `
        linear-gradient(50deg, rgba(43, 11, 50, 1), rgba(255, 255, 255, 0) 99.71%),
        linear-gradient(200deg, rgba(43, 11, 50, 1), rgba(255, 255, 255, 0) 60.71%),
        linear-gradient(127deg, rgba(43, 11, 50, 1), rgba(255, 255, 255, 0) 99.71%),
        linear-gradient(336deg, rgba(43, 11, 50, 1), rgba(255, 255, 255, 0) 99.71%)
    `,
    borderTopLeftRadius: "25px",
    borderTopRightRadius: "25px",
  },
};

Modal.setAppElement("#root");

function ReadAllComments({ isOpen, onRequestClose, videoId }) {

  const [allComments, setAllComments] = useState("");

  // code démo version statique (hébergement sans BDD) ++++++++++++++++++++++++++
  useEffect(() => {

    if (videoId !== undefined && videoId !== null) {
      const filteredComments = comments.filter(
        (comment) => comment.video_id == videoId
      );
      
      setAllComments(filteredComments);
      
    }
  }, [videoId]);

  // Code fetch API Node JS ------------------------------------------
  // useEffect(() => {
  //   async function getAllComments() {
  //     try {
  //       const comments = await fetch(
  //         FETCH_URL + "/comments/all-comments/" + videoId,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (comments.status === 200) {
  //         const json = await comments.json();
  //         setAllComments(json);
  //       }
  //     } catch (error) {
  //       throw Error(error);
  //     }
  //   }
  //   getAllComments();
  // }, [allComments]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Custom Popup"
    >
      <div className="popup-ctn">
        <button onClick={onRequestClose} className="popup-btn">
          <FontAwesomeIcon icon={faXmark} size="xl" />
        </button>
        <h3>Commentaires</h3>

        <div className="popup-commentaires">
          {!allComments.length ? (
            <>
              <p className="comment">Aucun commentaire pour le moment</p>
            </>
          ) : (
            allComments.map((allComments) => {
              const elapsed = timeElapsed(allComments.publication_date);

              return (
                <>
                  <p className="comment-user">
                    <FontAwesomeIcon icon={faCircleUser} size="xs" />{" "}
                    <strong>{allComments.pseudo}</strong>{" "}
                    {!elapsed ? <></> : <>{elapsed.times}</>}
                  </p>
                  <p className="comment">
                    <TruncatedText text={allComments.comment} maxLength={50} />
                  </p>
                </>
              );
            })
          )}
        </div>
        <div className="endline"></div>
      </div>
    </Modal>
  );
}

export default ReadAllComments;
