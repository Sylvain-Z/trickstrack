// import { useState, useEffect } from "react";
import React from "react";

// import { FETCH_URL } from '../../../Assets/Variables/const'; // pour version API

import { flattricks } from "./Variables/flattricks"; // variables js pour démo version statique (hébergement sans BDD)

function Flat() {

    // Code fetch API Node JS ----------------------------------------------------------
    // const [tricks, setTricks] = useState([]);
    // useEffect(() => {
    //     async function getData() {
    //         try {
    //             const tricks = await (
    //                 await fetch(FETCH_URL + "tricks/flats") // récupère les noms des figures
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
            <h3>Flat</h3>

            {/* {!tricks ? (
                <>
                    <p>La liste est vide</p>
                </>
            ) : (tricks.map(trick =>

                <React.Fragment key={trick.id}>
                    <p>{trick.name}</p>
                </React.Fragment>
            ))} */}

            {!flattricks ? (
                <>
                    <p>La liste est vide</p>
                </>
            ) : (flattricks.map(flattrick =>

                <React.Fragment key={flattrick.id}>
                    <p>{flattrick.name}</p>
                </React.Fragment>
            ))}
            <p>etc...</p>
        </>
    )


};


export default Flat;