// import { useState, useEffect } from "react";
import React from "react";

// import { FETCH_URL } from '../../../Assets/Variables/const'; // pour version API

import { grabs } from "./Variables/grabs"; // variables js pour démo version statique (hébergement sans BDD)


function Grabs() {

    // Code fetch API Node JS ----------------------------------------------------------
    // const [tricks, setTricks] = useState([]);
    // useEffect(() => {
    //     async function getData() {
    //         try {
    //             const tricks = await (
    //                 await fetch("/api/v1/tricks/grabs") // récupère les noms des figures
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
            <h3>Grabs</h3>

            {/* {!tricks ? (
                <>
                    <p>La liste est vide</p>
                </>
            ) : (tricks.map(trick =>

                <React.Fragment key={trick.id}>
                    <p>{trick.name}</p>
                </React.Fragment>
            ))} */}

            {!grabs.length ? (
                <>
                    <p>Liste à venir</p>
                </>
            ) : (grabs.map(grab =>

                <React.Fragment key={grab.id}>
                    <p>{grab.name}</p>
                </React.Fragment>
            ))}
            <p>etc...</p>
        </>
    );

};


export default Grabs;