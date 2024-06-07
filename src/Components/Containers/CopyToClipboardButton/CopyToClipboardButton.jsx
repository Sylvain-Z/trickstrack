import React from "react";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const CopyToClipboardButton = ({ videoId }) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        "https://trickstrack.vercel.app/video/" + videoId
      );
      toast.success("URL copiée !", {
        className: "toast-message",
        progressClassName: "my-toast-progress-bar",
        icon: false,
        bodyClassName: "my-toast-body"
      });
    } catch (err) {
      toast.error("Erreur lors de la copie de l'URL");
      console.error("Erreur lors de la copie de l'URL : ", err);
    }
  };

  return (
    <>
      <button
        type="button"
        className="commentpicto gold static"
        onClick={copyToClipboard}
      >
        <FontAwesomeIcon icon={faLink} size="lg " />
      </button>
    </>
  );
};

export default CopyToClipboardButton;
