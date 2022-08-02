import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Header = () => {
  return (
    <div className='header-container'>
      <div className='header-section-title'>
        <div className='header-title-box'>
          <h1>no</h1>
          <h1 className='title-underline'>body</h1>
        </div>
      </div>
      <div className='header-items'>
        <div className='header-sections'>
          <p>collections</p>
        </div>
        <div className='header-about'>
          <p>about</p>

        </div>
      </div>



    </div>
  )
}

export default Header
