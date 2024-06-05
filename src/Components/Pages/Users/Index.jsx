import React from "react";
import { useState } from "react";

import AddVideo from "./Videos/AddVideo";
import MyVideos from "./Videos/Index";
import MyTricksList from "./MyTricksList/Index";
import MyInfos from "./MyInfos/Index";
import AccountSecurity from "./Security/Index";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faFilm,
  faReceipt,
  faInfo,
  faShield,
} from "@fortawesome/free-solid-svg-icons";

function Tracker() {
  const [selectedTab, setSelectedTab] = useState("");

  const renderComponent = () => {
    switch (selectedTab) {
      case "AddVideo":
        return <AddVideo />;
      case "MyVideos":
        return <MyVideos />;
      case "MyTricksList":
        return <MyTricksList />;
      case "MyInfos":
        return <MyInfos />;
      case "AccountSecurity":
        return <AccountSecurity />;
      default:
        return <h3>Sélectionne une section</h3>;
    }
  };

  return (
    <>
      <section className="mytracker-ctn">
        <h2 className="mytracker-title">Mon tracker</h2>
        <div className="mytracker-nav">
          <button onClick={() => setSelectedTab("AddVideo")} className="addVideo-tab">
          <FontAwesomeIcon icon={faPlusSquare} size="xl" />
          </button>
          <button onClick={() => setSelectedTab("MyVideos")}><FontAwesomeIcon icon={faFilm}  size="xl" /></button>
          <button onClick={() => setSelectedTab("MyTricksList")}>
          <FontAwesomeIcon icon={faReceipt}  size="xl" />
          </button>
          <button onClick={() => setSelectedTab("MyInfos")}>
          <FontAwesomeIcon icon={faInfo}  size="xl" />
          </button>
          <button onClick={() => setSelectedTab("AccountSecurity")}>
          <FontAwesomeIcon icon={faShield}  size="xl" />
          </button>
        </div>
        <article className="mytracker">{renderComponent()}</article>
      </section>
    </>
  );
}

export default Tracker;
