import React from 'react';
import Link from 'next/link';
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';



const Footer = () => {
  const date = new Date().getFullYear()

  return (
    <div className="footer-container">

      <div>
        <p className="footer-home">
          <Link href="/">
          nobody. ||
          </Link>
          <i> {date}</i>
        </p>

      </div>

      <div>

        <p className="icons">
        <a href="https://twitter.com/nobody_clothing"><AiOutlineTwitter /></a>
        </p>

      </div>


    </div>
  )
}

export default Footer
