
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react'


import { FETCH_URL } from '../../Assets/Variables/const';
import { getItemWithExpiration } from '../../Assets/Variables/functions';

import Board from '../../Assets/Images/HeaderSkate.png';
import Open from '../../Assets/Images/MenuOuvert.png';
import Closed from '../../Assets/Images/MenuFerme.png';

function Header() {

    const { pathname } = useLocation();

    /* Menu Burger */
    const [menuHidden, setMenuHidden] = useState(true);
    const toggleMenu = () => {
        setMenuHidden(prevMenuHidden => !prevMenuHidden);
    };
    useEffect(() => { // pour que le menu se referme automatiquement si l'internaute ne s'en sert pas
        let intervalId;
        if (!menuHidden) {
            intervalId = setInterval(toggleMenu, 7000);
        }
        return () => clearInterval(intervalId); // Nettoie l'intervalle lorsque le composant est démonté
    }, [menuHidden]); // Utilisation de [menuHidden] comme dépendance
    const handleButtonClick = () => {
        toggleMenu();
    };

    /* Gère l'état des boutons de connexion et déconnexion et la récupération des données du user */
    const [users, setUsers] = useState(null);
    const myuserid = getItemWithExpiration("myuserid"); // récupère le pseudo de l'usager stocké lors du signin
    useEffect(() => {
        async function getData() {
            try {
                let id = "";
                if (!myuserid) {
                    return
                } else {
                    id = myuserid;
                }
                const TOKEN = getItemWithExpiration('auth');
                const users = await fetch(FETCH_URL + "users/" + id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication': `Bearer ${TOKEN}`
                    }
                });
                if (users.status === 200) {
                    const json = await users.json();
                    setUsers(json);
                }
            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, []);


    return (
        <>
            <header className={pathname === "/" ? "hidden" : ""}>

                <div className="header-ctn">
                    <div className="logo-div">
                        <Link to="/"><img src={Board} alt="" className="header-img" /></Link>
                    </div>

                    <div className="nav-ctn">

                        <div className={!menuHidden ? "menu-ctn-open" : "menu-ctn-closed"}>

                            <div className="menu-name"><h1 className="menu-name-title mediaQ_show-laptop_desktop">TricksTrack</h1></div> {/* Visible uniquement en version laptop et desktop lorsque le menu est ouvert et fermé*/}

                            <img src={Closed} alt="pictogram barres" className={!menuHidden ? "faBars burger_hidden" : "faBars"} onClick={handleButtonClick} />
                            <img src={Open} alt="pictogram croix" className={!menuHidden ? "faXmark" : "faXmark burger_hidden"} onClick={toggleMenu} />

                            <div className="menu-name"><h1 className={!menuHidden ? "menu-name-title mediaQ_show-mobile_tablet" : "burger_hidden"}>TricksTrack</h1></div> {/* Visible uniquement version mobil et tablet lors de l'ouverture du menu */}
                        </div>

                        <nav className={!menuHidden ? "" : "burger_hidden"}>
                            {/* <div className="menu"><FontAwesomeIcon icon={faMagnifyingGlass} size="xl" className="fa fa-search" /></div> */}
                            <div className="links">
                                <NavLink to="/galerie" >Nouveautés</NavLink>
                                <NavLink >Catégories</NavLink>
                                <NavLink to="/tricks-list" >Liste des tricks</NavLink>
                                <NavLink to="/skate-dice" className="new-Navlink"><span>Nouveauté</span> Skate Dice</NavLink>
                            </div>

                            <div className={!menuHidden ? "logs" : "burger_hidden"}>
                                {!users ? (
                                    <>
                                        <NavLink to="/utilisateurs/connexion" className="header-button"><p className="logs-login">Se connecter</p></NavLink>
                                    </>
                                ) : (
                                    <>
                                        <NavLink to={`/utilisateurs/mon-tracker/${users[0].id}`} className="header-button"><p className="logs-profil">Mon tracker</p></NavLink>
                                        <NavLink to="/utilisateurs/deconnexion" className="header-button"><p className="logs-logout">Se déconnecter</p></NavLink>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>



                </div>
            </header>
        </>
    );
}

export default Header;