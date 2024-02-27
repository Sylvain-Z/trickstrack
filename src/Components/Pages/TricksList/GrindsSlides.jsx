// import { useState, useEffect } from "react";
import React from "react";

// import { FETCH_URL } from '../../../Assets/Variables/const'; // pour version API

import { grindslides } from "./Variables/grindslides"; // variables js pour démo version statique (hébergement sans BDD)


function GrindsSlides() {


    // Code fetch API Node JS ----------------------------------------------------------
    // const [tricks, setTricks] = useState([]);
    // useEffect(() => {
    //     async function getData() {
    //         try {
    //             const tricks = await (
    //                 await fetch("/api/v1/tricks/grind-slides") // récupère les noms des figures
    //             ).json();
    //             setTricks(tricks.datas);

    //         } catch (error) {
    //             throw Error(error);
    //         }
    //     }
    //     getData();
    // }, [tricks]);

    return (
        <>
            <h3>Grinds</h3>
            <h3>& Slides</h3>

            {/* {!tricks ? (
                <>
                    <p>La liste est vide</p>
                </>
            ) : (tricks.map(trick =>

                <React.Fragment key={trick.id}>
                    <p>{trick.name}</p>
                </React.Fragment>
            ))} */}

            {!grindslides ? (
                <>
                    <p>La liste est vide</p>
                </>
            ) : (grindslides.map(grindslide =>

                <React.Fragment key={grindslide.id}>
                    <p>{grindslide.name}</p>
                </React.Fragment>
            ))}
            <p>etc...</p>
        </>
    )
};


export default GrindsSlides;