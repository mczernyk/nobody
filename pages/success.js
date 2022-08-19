import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsCheckCircle } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">

        <h2>♡ nobody appreciates you ♡</h2>
        <p className="description">you will receive an email with tracking info once your order is in production.</p>
        <p className="description">
          email
          <a className="email" href="mailto:nobodyclothingnyc@gmail.com"> nobodyclothingnyc@gmail.com
          </a> or send a message on <a className='twitter-about' href="https://twitter.com/nobody_clothing">twitter</a> with any issues.
        </p>
          <div className="success-button">
          <h3>
            <Link href="/">
                go home
            </Link>
          </h3>
          </div>

      </div>
    </div>
  )
}

export default Success
