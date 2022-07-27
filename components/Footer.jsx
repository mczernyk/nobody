import React from 'react';
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';



const Footer = () => {
  const date = new Date().getFullYear()

  return (
    <div className="footer-container">
      <p>nobody || <i>{date}</i></p>
      <div>

        <p className="icons">
        <a href="https://twitter.com/nobody_clothing"><AiOutlineTwitter /></a>
        </p>

      </div>


    </div>
  )
}

export default Footer
