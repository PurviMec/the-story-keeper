import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Gmail from "../../images/Gmail.png";
import gitHub from "../../images/gitHub.png";
import appLogo from "../../images/appLogo.png";

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container">
        &copy; {new Date().getFullYear()} The Story Keeper App
      </div>
      {/* <div>Contact Info: </div> */}
        {/* <Popup trigger={<button> <img src={Gmail} alt='/G'/> </button>} position="top center">
          <div className='card pop-up-card'>
            <p>Purvi Mecwan: princy.mecwan@gmail.com</p>
            <p>Jonelle Harris: jonelle.harris04@gmail.com</p>
            <p>Geoffrey Moluba: </p>
          </div>
        </Popup>
        <Popup trigger={<button> <img src={gitHub} alt='/Gk'/> </button>} position="top center">
          <div className='card'>
            <p>Purvi Mecwan: https://github.com/PurviMec </p>
            <p>Jonelle Harris: https://github.com/JonelleH430</p>
            <p>Geoffrey Moluba: </p>
          </div>
        </Popup>
        <Popup trigger={<button> <img src={appLogo} alt='/Gk'/> </button>} position="top center">
          <div className='card'>
            <p>gitHub URL:  </p>
          </div>
        </Popup> */}

    </footer>
  );
};

export default Footer;