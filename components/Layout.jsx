import React from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';
import SoundEffects from './SoundEffects';
import SoundHint from './SoundHint';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <SoundEffects />
      <SoundHint />
      <Head>
        <title>nobody</title>
      </Head>

      <header>
        <Navbar />
      </header>

      <main className="main-container">
        {children}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
