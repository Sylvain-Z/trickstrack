import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signout } from '../../../../store/slices/user'

function SignOut() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pseudo, setPseudo] = useState("");

  dispatch(signout(pseudo))

  function navigateToHome() {
    localStorage.removeItem("auth");
    localStorage.removeItem("myuserid");
    setTimeout(()=>
    {navigate("/")}
    , 500);
  };
  navigateToHome();

  return <h2>Retour à l'accueil</h2>
};

export default SignOut;