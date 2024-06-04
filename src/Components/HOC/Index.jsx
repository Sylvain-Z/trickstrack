import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FETCH_URL } from '../../Assets/Variables/const';
import { getItemWithExpiration } from '../../Assets/Variables/functions';

import { signout } from "../../store/slices/user";

import Header from './Header'
import Footer from './Footer'

function HOC({ child, auth  }) {

    const Child = child;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tokenIsValid, setTokenIsValid] = useState(false);
    const TOKEN = getItemWithExpiration('auth');

    useEffect(() => {
        async function checkAuth() {
            if (auth) {
                if (!TOKEN) {
                    navigate("/");
                }
                if (TOKEN) {
                    const res = await fetch(FETCH_URL + "users/check_token", {
                        headers: { Authentication: "Bearer " + TOKEN },
                    });
                    if (res.status === 401) {
                        localStorage.removeItem("auth")
                        dispatch(signout());
                        navigate("/galerie");
                    }
                    if (res.status === 200) {
                        // const json = await res.json();
                        setTokenIsValid(true);
                    }
                }
            }
        }
        checkAuth();
    }, [auth]);


    return (
        <div>

            {(!auth || (auth && tokenIsValid)) && <Header />}

            <main>
                {(!auth || (auth && tokenIsValid)) && <Child />}
            </main>

            <Footer />


        </div>
    );
}

export default HOC;