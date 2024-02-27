import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// // import { FETCH_URL } from '../../assets/const';
// // import { getItemWithExpiration } from '../../assets/functions';

// import { signout } from "../../store/slices/user";

import Header from './Header'
import Footer from './Footer'

function HOC({ child }) {

    const Child = child;

    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();



    return (
        <div>

            <Header />

            <main>
                <Child />
            </main>

            <Footer />


        </div>
    );
}

export default HOC;