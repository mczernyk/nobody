import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities, connectWallet, walletAddress, setWalletAddress  } = useStateContext();

  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <h1 className="logo">
          <Link href="/">nobody</Link>
        </h1>
        <p className="wallet-info">
        . || account: {walletAddress}
        </p>

      </div>

      <div className='navbar-right'>

       <button type="button" onClick={() => connectWallet()} className="connect-wallet">
          Connect Wallet
        </button>

        <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>

        {showCart && <Cart />}

      </div>

    </div>
  )
}

export default Navbar
