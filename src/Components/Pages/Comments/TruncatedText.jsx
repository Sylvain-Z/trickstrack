import React, { useState } from "react";

const TruncatedText = ({ text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const truncatedText =
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  return (
    <>
      {isTruncated ? truncatedText : text}{" "}
      {text.length > maxLength && (
        <button onClick={toggleTruncate} className="truncated-btn">
          {isTruncated ? "Voir plus" : "Voir moins"}
        </button>
      )}
    </>
  );
};

export default TruncatedText;
