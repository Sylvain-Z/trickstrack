import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signout } from '../../../../store/slices/user'

function SignOut() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState("");

  dispatch(signout(id))

  function navigateToHome() {
    localStorage.removeItem("auth");
    localStorage.removeItem("fakeauth"); // code démo version statique (hébergement sans BDD) ++++++++++++++++++++++++++
    setTimeout(()=>
    {navigate("/")}
    , 500);
  };
  navigateToHome();

  return <h2>Retour à l'accueil</h2>
};

export default SignOut;