import React from 'react';
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>nobody (2022)</p>
      <p className="icons">
        <AiOutlineTwitter />
        <AiFillInstagram />
      </p>
    </div>
  )
}

export default Footer
