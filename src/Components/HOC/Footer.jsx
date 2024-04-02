import { useLocation, Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {

    const { pathname } = useLocation();

    return (
        <>
            <footer className={pathname === "/" ? "hidden" : ""}>

                <Link to="https://www.facebook.com/" ><FontAwesomeIcon icon={faFacebookF} size="lg" className="fa fa-facebook-f media" /></Link>
                <Link to="https://www.instagram.com/"><FontAwesomeIcon icon={faInstagram} size="lg" className="fa fa-facebook-f media" /></Link>
                <p id="legal-link"><Link to="/mentions-legales">CGU</Link></p>

            </footer>

        </>
    );
}

export default Footer;