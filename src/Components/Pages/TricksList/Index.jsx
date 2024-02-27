import React from "react";
import { useState } from "react";

import FlatTricks from "./Flat";
import GrindsSlides from "./GrindsSlides";
import Grabs from "./Grabs";
import Gap from "./Gaps";
import Ramps from "./Ramps";


function TricksList() {
    const [selectedTab, setSelectedTab] = useState("");

    const renderComponent = () => {
        switch (selectedTab) {
            case "FlatTricks":
                return <FlatTricks/>
            case "GrindsSlides":
                return <GrindsSlides/>
            case "Grabs":
                return <Grabs/>
            case "Gaps":
                return <Gap/>
            case "Ramps":
                return <Ramps/>
            default:
                return <h3>Sélectionne une catégorie</h3>;
        }
    }


    return (
        <>
            <section className="trickslist-ctn">
                <h2 className="trickslist-title">Liste des tricks</h2>
                <div className="trickslist-nav">
                    <button onClick={() => setSelectedTab("FlatTricks")}>Flat Tricks</button>
                    <button onClick={() => setSelectedTab("GrindsSlides")}>Grinds & Slides</button>
                    <button onClick={() => setSelectedTab("Grabs")}>Grabs</button>
                    <button onClick={() => setSelectedTab("Gaps")}>Gaps</button>
                    <button onClick={() => setSelectedTab("Ramps")}>Ramps</button>
                </div>
                <article className="trickslist-list">
                    {renderComponent()}
                </article>
            </section>
        </>
    )
};

export default TricksList;