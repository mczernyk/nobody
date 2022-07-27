import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
// import getStripe from '../lib/getStripe';


const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
        type="button"
        className="cart-heading"
        onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">your cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>your bag is empty :(</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                gear up
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item, i) => (
            <div className="product" key={i}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5 className='cart-item-name'>{item.name}</h5>
                  <h5 className="cart-price">${item.price}</h5>
                </div>
                <div className="flex top">
                  <h4>size: {item.sizeChoice}</h4>
                  <h4>color: <span className='cart-item-name'>{item.colorChoice}</span></h4>
                </div>
                <div className="flex bottom">
                  <div>
                  <p className="quantity-desc">
                    <span className="minus" onClick={() => toggleCartItemQuanitity(item.key, 'dec') }>
                    <AiOutlineMinus />
                    </span>
                    <span className="num" onClick="">{item.quantity}</span>
                    <span className="plus" onClick={() => toggleCartItemQuanitity(item.key, 'inc') }><AiOutlinePlus /></span>
                  </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item.key)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>subtotal:</h3>
              <h3 className='cart-price'>${totalPrice.toFixed(2)}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={''}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
