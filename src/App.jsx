import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Pages tout publique */
import HOC from "./Components/HOC/Index";
import Home from "./Components/Pages/Home/Index";
import Galery from "./Components/Pages/Galery/Index";
import Legal from "./Components/Pages/Others/Legal";

import TricksList from "./Components/Pages/TricksList/Index";
import Flat from "./Components/Pages/TricksList/Flat";
import Gap from "./Components/Pages/TricksList/Gaps";
import GrindsSlides from "./Components/Pages/TricksList/GrindsSlides";
import Ramps from "./Components/Pages/TricksList/Ramps";

import SkateDice from "./Components/Pages/SkateDice/index";

/* Pages compte client */
import Tracker from "./Components/Pages/Users/Index";
import UploadSucceded from "./Components/Pages/Users/Videos/UploadSucceded";
import Signup from "./Components/Pages/Users/Connection/Signup";
import Signin from "./Components/Pages/Users/Connection/Signin";
import SignOut from "./Components/Pages/Users/Connection/Signout";


function App() {


  return (

    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HOC child={Home} />} />
        <Route path="/galerie" element={<HOC child={Galery} />} />
        <Route path="/mentions-legales" element={<HOC child={Legal} />} />
        <Route path="/skate-dice" element={<HOC child={SkateDice} />} />

        <Route path="/tricks-list" element={<HOC child={TricksList} />}>
          <Route path="gap" element={<HOC child={Gap} />} />
          <Route path="grind-slide" element={<HOC child={GrindsSlides} />} />
          <Route path="flat" element={<HOC child={Flat} />} />
          <Route path="ramps" element={<HOC child={Ramps} />} />
        </Route>

        <Route path="utilisateurs" >
          <Route path="creer-un-compte" element={<HOC child={Signup} />} />
          <Route path="connexion" element={<HOC child={Signin} />} />
          <Route path="deconnexion" element={<HOC child={SignOut} />} />
          <Route path="mon-tracker/:id" element={<HOC child={Tracker} auth={true} />} />
          <Route path="telechargement_reussi" element={<HOC child={UploadSucceded} auth={true} />} />
        </Route>

      </Routes>
    </BrowserRouter>

  )
};

export default App;