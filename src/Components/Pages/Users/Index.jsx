import React from "react";
import { useState } from "react";

import MyInfos from "./MyInfos";
import MyVideos from "./Videos/Index";
import MyTricksList from "./MyTricksList/Index";


function Tracker() {
    const [selectedTab, setSelectedTab] = useState("");

    const renderComponent = () => {
        switch (selectedTab) {
            case "MyInfos":
                return <MyInfos/>
            case "MyVideos":
                return <MyVideos/>
            case "MyTricksList":
                return <MyTricksList/>
            default:
                return <h3>Sélectionne une catégorie</h3>;
        }
    };

    return (
        <>
            <section className="mytracker-ctn">
                <h2 className="mytracker-title">Mon tracker</h2>
                <div className="mytracker-nav">
                    <button onClick={() => setSelectedTab("MyInfos")}>Mes informations</button>
                    <button onClick={() => setSelectedTab("MyVideos")}>Videos</button>
                    <button onClick={() => setSelectedTab("MyTricksList")}>Ma liste de tricks</button>
                </div>
                <article className="mytracker">
                    {renderComponent()}
                </article>
            </section>
        </>
    )
};

export default Tracker;