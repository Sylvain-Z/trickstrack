// import { useState, useEffect } from "react";
import React from "react";

// import { FETCH_URL } from '../../../Assets/Variables/const'; // pour version API

import { ramps } from "./Variables/ramps"; // variables js pour démo version statique (hébergement sans BDD)


function Ramps() {

    // Code fetch API Node JS ----------------------------------------------------------
    // const [tricks, setTricks] = useState([]);
    // useEffect(() => {
    //     async function getData() {
    //         try {
    //             const tricks = await (
    //                 await fetch(FETCH_URL + "tricks/ramps") // récupère les noms des figures
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
            <h3>Ramps</h3>

            {/* {!tricks ? (
                <>
                    <p className="list">La liste est vide</p>
                </>
            ) : (tricks.map(trick =>

                <React.Fragment key={trick.id}>
                    <p className="list">{trick.name}</p>
                </React.Fragment>
            ))} */}

            {!ramps.length ? (
                <>
                    <p className="list">Liste à venir</p>
                </>
            ) : (ramps.map(ramp =>

                <React.Fragment key={ramp.id}>
                    <p className="list">{ramp.name}</p>
                </React.Fragment>
            ))}
            <p className="list">etc...</p>
        </>
    );

};


export default Ramps;