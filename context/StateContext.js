import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const [walletAddress, setWalletAddress] = useState('no wallet connected :(')
  const [nfts, setNfts] = useState([])
  const [miladys, setMiladys] = useState([])
  const [auras, setAuras] = useState([])
  const [cdbs, setCdbs] = useState([])
  const [banners, setBanners] = useState([])

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      setWalletAddress(accounts[0])

      console.log('MetaMask is installed!');
      toast.success(`wallet connected ;)`);
    }
  }

  const getNFTData = async () => {

    if (!walletAddress) {
      return
    }

    const response = await fetch(`https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:${walletAddress}`)

      const data = await response.json()

      setNfts(data.items)

      console.log(data.items)

      if (data.items) {

        const miladysFound = await data.items.filter(each => each.collection === "ETHEREUM:0x5af0d9827e0c53e4799bb226655a1de152a425a5")

        const aurasFound = await data.items.filter(each => each.collection === "ETHEREUM:0x2fc722c1c77170a61f17962cc4d039692f033b43")

        const bannersFound = await data.items.filter(each => each.collection ===
        "ETHEREUM:0x1352149cd78d686043b504e7e7d96c5946b0c39c")

        const cdbsFound = await data.items.filter(each => each.collection === "ETHEREUM:0x42069abfe407c60cf4ae4112bedead391dba1cdb")

        setMiladys(miladysFound)
        setAuras(aurasFound)
        setBanners(bannersFound)
        setCdbs(cdbsFound)

      }




      // debugger

  }
  const collectionHelper = async (data) => {
    if (walletAddress) {

      const miladysFound = await data.filter(each => each.collection === "ETHEREUM:0x5af0d9827e0c53e4799bb226655a1de152a425a5")

      const aurasFound = await data.filter(each => each.collection === "ETHEREUM:0x2fc722c1c77170a61f17962cc4d039692f033b43")

      const bannersFound = await data.filter(each => each.collection ===
      "ETHEREUM:0x1352149cd78d686043b504e7e7d96c5946b0c39c")

      const cdbsFound = await data.filter(each => each.collection ===       "ETHEREUM:0x42069abfe407c60cf4ae4112bedead391dba1cdb")

      setMiladys(miladysFound)
      setAuras(aurasFound)
      setBanners(bannersFound)
      setCdbs(cdbsFound)
    }
  }



  useEffect(() => {
    getNFTData()
  }, [walletAddress])


  let foundProduct;
  let index;
  let tempProd={}
  let tempQuant=1
  let tempSize=''
let tempColor=''

  const onAdd = (product, quantity, sizeChoice, colorChoice) => {

    if (!quantity) {
      quantity=tempQuant
    }

    if (!sizeChoice) {
      sizeChoice=tempSize
    }

    if (!colorChoice) {
      colorChoice=tempColor
    }

    const prodBuy = {
      name: product.name,
      image: product.image,
      price: product.price,
      sizeChoice: sizeChoice,
      colorChoice: colorChoice,
      custom: product.custom,
      slug: product.slug,
      _id: product._id,
      _type: product._type,
      key: `${product._id}sz${sizeChoice}${colorChoice}`
    }



    if (prodBuy.name === undefined){
      prodBuy=tempProd
    } else {
      tempProd = prodBuy
    }



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





      setCartItems(updatedCartItems);
    } else {
      prodBuy.quantity = quantity;
      setCartItems([...cartItems, { ...prodBuy }]);
    }

    toast.success(`you stuffed ${qty} size ${sizeChoice} ${colorChoice} ${product.name} into a tattered burlap sack.`);
  }

  const onRemove = (key) => {


    foundProduct = cartItems.find((item) => item.key === key);
    const newCartItems = cartItems.filter((item) => item.key !== key);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);

  }

  // TOGGLE BUG TO FIX - works, but items switch order while toggling

  const toggleCartItemQuanitity = (key, value) => {

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
        setTotalQuantities,
        walletAddress,
        setWalletAddress,
        connectWallet,
        nfts,
        setNfts,
        miladys,
        auras,
        cdbs,
        collectionHelper

      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);
