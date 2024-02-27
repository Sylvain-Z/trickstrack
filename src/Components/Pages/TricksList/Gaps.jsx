// import { useState, useEffect } from "react";
import React from "react";

// import { FETCH_URL } from '../../../Assets/Variables/const'; // pour version API

import { gaps } from "./Variables/gaps"; // variables js pour démo version statique (hébergement sans BDD)

function Gaps() {

    // Code fetch API Node JS ----------------------------------------------------------
    // const [tricks, setTricks] = useState([]);
    // useEffect(() => {
    //     async function getData() {
    //         try {
    //             const tricks = await (
    //                 await fetch(FETCH_URL + "tricks/gaps") // récupère les noms des figures
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
            <h3>Gaps</h3>

            {/* {!tricks ? (
                <>
                    <p>La liste est vide</p>
                </>
            ) : (tricks.map(trick =>

                <React.Fragment key={trick.id}>
                    <p>{trick.name}</p>
                </React.Fragment>
            ))}*/}

            {!gaps ? (
                <>
                    <p>La liste est vide</p>
                </>
            ) : (gaps.map(gap =>

                <React.Fragment key={gap.id}>
                    <p>{gap.name}</p>
                </React.Fragment>
            ))}
            <p>etc...</p>
        </>
    )
};


export default Gaps;