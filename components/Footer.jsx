import React from 'react';
import Link from 'next/link';
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';



const Footer = () => {
  const date = new Date().getFullYear()

  return (
    <div className="footer-container">

      <div className='footer-home-container'>
        <p className="footer-home">
          <Link href="/">
          nobody
          </Link>
        </p>
        <p className='footer-space'> ||<i> {date}</i>
        </p>

      </div>

      <div>

        <p className="icons">
        <a className='twitter' href="https://twitter.com/nobody_clothing"><AiOutlineTwitter /></a>
        </p>

      </div>


    </div>
  )
}

export default Footer
