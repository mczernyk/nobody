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
        <p>making digital assets real</p>
      <div className='header-items'>
        <div className='header-collections' >
          <p onClick={() => handleVisible(menuVisible)}>collections</p>
          {menuVisible && <div className='header-menu-items'>
            <p onClick={(e) => handleClickScroll(e, 'nobody')}>nobody</p>
            <p onClick={(e) => handleClickScroll(e, 'allstarz')}>allstarz</p>
            <p onClick={(e) => handleClickScroll(e, 'cdb')}>cryptodickbutts</p>
            <p onClick={(e) => handleClickScroll(e, 'milady')}>milady</p>
            <p onClick={(e) => handleClickScroll(e, 'milady aura')}>milady aura</p>
            <p onClick={(e) => handleClickScroll(e, 'milady deriv')}>milady deriv</p>
            <p onClick={(e) => handleClickScroll(e, 'remilio')}>remilio</p>
            <p onClick={(e) => handleClickScroll(e, 'misc')}>accessories</p>
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
