import React from 'react';
import Link from 'next/link';
import {IoMdMail} from 'react-icons/io';
import {AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai'
import { useStateContext } from '../context/StateContext';




const Footer = () => {
  const { handleClickScroll, scrollTo } = useStateContext();

  const date = new Date().getFullYear()

  return (
    <div className="footer-container">

      <div className='footer-home-container'>
        <p className="footer-home">
          <Link href="/">
          nobody
          </Link>
        </p>
        <p className='footer-space'> | {date}
        </p>

      </div>

      <div>

        <p className="icons">
        <a className='envelope' href="mailto:nobodyclothingnyc@gmail.com"><IoMdMail /></a>
        <a className='twitter' href="https://twitter.com/nobody_clothing"><AiOutlineTwitter /></a>
        <a className='envelope' href="https://instagram.com/nobodyclothingnyc"><AiFillInstagram /></a>

        </p>

      </div>


    </div>
  )
}

export default Footer
