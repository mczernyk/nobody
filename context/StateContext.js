import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;
  let tempProd={}
  let tempQuant=1
  let tempSize=''

  const onAdd = (product, quantity, sizeChoice) => {

    if (!quantity) {
      quantity=tempQuant
    }

    if (!sizeChoice) {
      sizeChoice=tempSize
    }

    const prodBuy = {
      name: product.name,
      image: product.image,
      price: product.price,
      sizeChoice: sizeChoice,
      custom: product.custom,
      slug: product.slug,
      _id: product._id,
      _type: product._type,
      key: `${product._id}sz${sizeChoice}`
    }



    if (prodBuy.name === undefined){
      prodBuy=tempProd
    } else {
      tempProd = prodBuy
    }



    console.log('PROD', product)


    console.log("PROD prodBuy", prodBuy)

    const checkProductInCart = cartItems.find((item) => item.key === prodBuy.key);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + prodBuy.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct.key === prodBuy.key){
          return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
          }

        } else {
          return cartProduct
        }
      })

      console.log('updatedCart', updatedCartItems)

      console.log('CART1', cartItems)



      setCartItems(updatedCartItems);
    } else {
      prodBuy.quantity = quantity;


      console.log('cartPB', prodBuy)
      console.log('CAR2', cartItems)
      setCartItems([...cartItems, { ...prodBuy }]);
    }

    toast.success(`you stuffed ${qty} size ${sizeChoice} ${product.name} into a tattered burlap sack.`);
  }

  const onRemove = (key) => {

   console.log('REMOVE PROD', key)

    foundProduct = cartItems.find((item) => item.key === key);
    const newCartItems = cartItems.filter((item) => item.key !== key);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    console.log('CAR3',newCartItems)
    setCartItems(newCartItems);

  }

  // TOGGLE BUG TO FIX - works, but items switch order while toggling

  const toggleCartItemQuanitity = (key, value) => {
    console.log('key', key)

    foundProduct = cartItems.find((item) => item.key === key)

    index = cartItems.findIndex((product) => product.key === key);

    const newCartItems = cartItems.filter((item) => item.key !== key)

    if(value === 'inc') {

      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);

      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
      }
    }
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);
