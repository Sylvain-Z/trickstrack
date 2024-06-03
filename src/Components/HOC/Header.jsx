
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react'

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
            intervalId = setInterval(toggleMenu, 70000);
        }
        return () => clearInterval(intervalId); // Nettoie l'intervalle lorsque le composant est démonté
    }, [menuHidden]); // Utilisation de [menuHidden] comme dépendance

    const handleButtonClick = () => {
        toggleMenu();
    };

    /* Gère l'état des boutons de connexion et déconnexion et la récupération des données du user */

    const myuserid = getItemWithExpiration("myuserid"); // récupère l'id de l'usager stocké lors du signin

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
                                <NavLink to="/galerie" onClick={toggleMenu}>Derniers Ajouts</NavLink>
                                <NavLink to="/tricks-list"onClick={toggleMenu}>Liste des tricks</NavLink>
                                <NavLink to="/skate-dice" onClick={toggleMenu}>Skate Dice</NavLink>
                                <NavLink onClick={toggleMenu}  className="special-Navlink" ><span>Prochainement</span> Catégories</NavLink>
                            </div>

                            <div className={!menuHidden ? "logs" : "burger_hidden"}>
                                {!myuserid ? (
                                    <>
                                        <p className="button_ctn logs-login"><NavLink to="/utilisateurs/connexion" onClick={toggleMenu}>Se connecter</NavLink></p>
                                    </>
                                ) : (
                                    <>
                                        <p className="button_ctn logs-profil"><NavLink to={`/utilisateurs/mon-tracker/${myuserid}`} onClick={toggleMenu}>Mon tracker</NavLink></p>
                                        <p className="button_ctn logs-logout"><NavLink to="/utilisateurs/deconnexion" onClick={toggleMenu}>Se déconnecter</NavLink></p>
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