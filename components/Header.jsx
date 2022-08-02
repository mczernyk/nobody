import React, {useState} from 'react';
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';

const Header = () => {
  const { menuVisible, setMenuVisible } = useStateContext();

  const handleVisible = (visible) => {
    setMenuVisible(!visible)
  }

  const handleClickScroll = (e, name) => {
    e.preventDefault()

    let scroll = true
    let elem = document.getElementById(name)
          scroll = elem ? true : false

    scroll
      ? scrollTo(elem, 0, null)
      : console.log(`Element not found: ${elem}`) // eslint-disable-line
  }
  const scrollTo = (element, offSet = 0, timeout = null) => {
    const elemPos = element
      ? element.getBoundingClientRect().top + window.pageYOffset
      : 0
    if (timeout) {
      setTimeout(() => {
        window.scroll({ top: elemPos + offSet, left: 0, behavior: "smooth" })
      }, timeout)
    } else {
      window.scroll({ top: elemPos + offSet, left: 0, behavior: "smooth" })
    }
  }

  return (
    <div className='header-container'>
      <div className='header-section-title'>
        <div className='header-title-box'>
          <h1>no</h1>
          <h1 className='title-underline'>body</h1>
        </div>
      </div>
      <div className='header-items'>
        <div className='header-collections'>
          <p onClick={() => handleVisible(menuVisible)}>collections</p>
          {menuVisible && <div className='header-menu-items'>
            <p onClick={(e) => handleClickScroll(e, 'nobody')}>nobody</p>
            <p onClick={(e) => handleClickScroll(e, 'cdb')}>cdb</p>
            <p onClick={(e) => handleClickScroll(e, 'milady')}>milady</p>
            <p onClick={(e) => handleClickScroll(e, 'milady aura')}>milady aura</p>
            <p onClick={(e) => handleClickScroll(e, 'milady deriv')}>milady deriv</p>
          </div>}
        </div>
        <div className='header-about'>
          <Link href="/about">
            <p>about</p>
          </Link>
        </div>
      </div>



    </div>
  )
}

export default Header
