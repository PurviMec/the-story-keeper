import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import contact from "../../images/contact.png";

const Footer = () => {
  return (
    <footer className="flex-row ">
      <div className="container mb-2 d-flex row justify-content-center">
        <div className='col-3'>
        <Popup
        className=' ' 
        trigger={<button className='pop-btn mt-2'> <img src={contact} alt='/G' className='pop-img '/> </button>} 
        position="right center">
          <div className=' m-2 '>
            <p>Purvi Mecwan</p>
            <p>Jonelle Harris</p>
            <p>Geoffrey Moluba </p>
          </div>
        </Popup>
        </div>
        <div className='col-6 mt-3'>
        &copy; {new Date().getFullYear()} The Story Keeper App
        </div>
      </div>
    </footer>
  );
};

export default Footer;