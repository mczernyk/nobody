import React, {useState} from 'react';
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';

const Header = () => {
  const { menuVisible, setMenuVisible, handleClickScroll, scrollTo } = useStateContext();

  const handleVisible = (visible) => {
    setMenuVisible(!visible)
  }


  return (
    <div className='header-container'>
      <div className='header-section-title'>
        <div className='header-title-box'>
          <h1>no</h1>
          <h1>body</h1>

        </div>
      </div>
        <p>nobody loves you</p>
      <div className='header-items'>
        <div className='header-collections' >
          <p className="sound-click1" onClick={() => handleVisible(menuVisible)}>collections</p>
          {menuVisible && <div className='header-menu-items'>
            <p className="sound-click1" onClick={(e) => handleClickScroll(e, 'nobody')}>nobody</p>
            <p className="sound-click1" onClick={(e) => handleClickScroll(e, 'egirl')}>$egirl</p>
            <p className="sound-click1" onClick={(e) => handleClickScroll(e, 'milady')}>milady</p>
            <p className="sound-click1" onClick={(e) => handleClickScroll(e, 'pixelady')}>derivs</p>
            <p className="sound-click1" onClick={(e) => handleClickScroll(e, 'radbro')}>radbro</p>
            <p className="sound-click1" onClick={(e) => handleClickScroll(e, 'dadbro')}>dadbro</p>
            <p className="sound-click1" onClick={(e) => handleClickScroll(e, 'remilio')}>remilio</p>
            <p className="sound-click1" onClick={(e) => handleClickScroll(e, 'bonkler')}>bonkler</p>
            <p className="sound-click1" onClick={(e) => handleClickScroll(e, 'cdb')}>cdb</p>
            <p className="sound-click1" onClick={(e) => handleClickScroll(e, 'banners')}>banners</p>
          </div>}
        </div>
        <div className='header-about'>
          <Link href="/about">
            <a className="sound-click1">about</a>
          </Link>
        </div>
      </div>



    </div>
  )
}

export default Header
