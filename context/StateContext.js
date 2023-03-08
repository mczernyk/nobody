import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [customChoice, setCustomChoice] = useState('');
  const [sizeChoice, setSizeChoice] = useState('')
  const [colorChoice, setColorChoice] = useState('')
  const [checked, setChecked] = useState(false)
  const [customText, setCustomText] = useState('')

  const [preview, setPreview] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false)

  const [walletAddress, setWalletAddress] = useState('no wallet connected :(')
  const [abbvWalletAddress, setAbbvWalletAddress] = useState('')
  const [nfts, setNfts] = useState([])
  const [miladys, setMiladys] = useState([])
  const [pixeladys, setPixeladys] = useState([])
  const [auras, setAuras] = useState([])
  const [cdbs, setCdbs] = useState([])
  const [banners, setBanners] = useState([])
  const [mililys, setMililys] = useState([])
  const [milads, setMilads] = useState([])
  const [derivs, setDerivs] = useState([])
  const [allstarz, setAllstarz] = useState([])
  const [remilios, setRemilios] = useState([])
  const [radbros, setRadbros] = useState([])





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


  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      setWalletAddress(accounts[0])

      let abbvAddy = accounts[0].slice(0,5) + '...' + accounts[0].slice(-4)

      setAbbvWalletAddress(abbvAddy)

      // console.log('MetaMask is installed!');
      toast.success(`wallet connected ;)`);
    }
  }

  const getNFTData = async () => {

    if (!walletAddress) {
      return
    }

    const response = await fetch(`https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:${walletAddress}&size=${100000}`)


      const data = await response.json()

      setNfts(data.items)

      // NFT LIST
      console.log(data.items)

      if (data.items) {

        const miladysFound = await data.items.filter(each => each.collection === "ETHEREUM:0x5af0d9827e0c53e4799bb226655a1de152a425a5")

        const pixeladysFound = await data.items.filter(each => each.collection === "ETHEREUM:0x8fc0d90f2c45a5e7f94904075c952e0943cfccfd")

        const aurasFound = await data.items.filter(each => each.collection === "ETHEREUM:0x2fc722c1c77170a61f17962cc4d039692f033b43")

        const bannersFound = await data.items.filter(each => each.collection ===
          "ETHEREUM:0x1352149cd78d686043b504e7e7d96c5946b0c39c")

        const derivsFound = await data.items.filter(each => (each.collection ===
          "ETHEREUM:0x3a007afa2dff13c9dc5020acae1bcb502d4312e2" || each.collection === "ETHEREUM:0x0d8a3359182dca59ccaf36f5c6c6008b83ceb4a6"))

        const cdbsFound = await data.items.filter(each => each.collection === "ETHEREUM:0x42069abfe407c60cf4ae4112bedead391dba1cdb")

        const allstarzFound = await data.items.filter(each => each.collection === "ETHEREUM:0xec0a7a26456b8451aefc4b00393ce1beff5eb3e9")

        const remiliosFound = await data.items.filter(each => each.collection === "ETHEREUM:0xd3d9ddd0cf0a5f0bfb8f7fceae075df687eaebab")

        const radbrosFound = await data.items.filter(each => each.collection === "ETHEREUM:0xabcdb5710b88f456fed1e99025379e2969f29610")

        const mililysFound = await data.items.filter(each => each.collection === "ETHEREUM:0x71481a928c24c32e4d9a4394fab3168a3a1cfd11")

        const miladsFound = await data.items.filter(each => each.collection === "ETHEREUM:0x61628d84d0871a38f102d5f16f4e69ee91d6cdd9")


        setMiladys(miladysFound)
        setPixeladys(pixeladysFound)
        setAuras(aurasFound)
        setCdbs(cdbsFound)
        setBanners(bannersFound)
        setDerivs(derivsFound)
        setAllstarz(allstarzFound)
        setRemilios(remiliosFound)
        setRadbros(radbrosFound)
        setMililys(mililysFound)
        setMilads(miladsFound)
      }




      // debugger

  }


  useEffect(() => {
    getNFTData()
  }, [walletAddress])

  const resetDefaults = (product) => {
    setSizeChoice(`${product.size[0]}`)
    setColorChoice(`${product.color[0]}`)
    setPreview(0)
    setMenuVisible(false)
    setChecked(false)
  }


  let foundProduct;
  let index;
  let tempProd={}
  let tempQuant=1
  let tempSize=''
  let tempColor=''

  const onAdd = (product, quantity, sizeChoice, colorChoice, customChoice, preview, checked) => {

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
      preview: preview,
      slug: product.slug,
      checked: checked ? 'no name/#' : '',
      _id: product._id,
      _type: product._type,
      key: `${product._id}${product.name}sz${sizeChoice}${colorChoice}`
    }

    if (customChoice){
      prodBuy.name = customChoice
      prodBuy.key = `${product._id}${customChoice}sz${sizeChoice}${colorChoice}${checked}`
    }

    console.log('checkedName', prodBuy.checked)



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

    toast.success(`you stuffed ${qty} size ${prodBuy.sizeChoice} ${prodBuy.colorChoice} ${prodBuy.name} into a tattered burlap sack.`);
    setCustomChoice('')
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

      // setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);

      setCartItems([
        ...newCartItems.slice(0,index),
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
        ...newCartItems.slice(index)
       ]);



      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        // setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setCartItems([
          ...newCartItems.slice(0,index),
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
          ...newCartItems.slice(index)
         ]);

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
        abbvWalletAddress,
        setAbbvWalletAddress,
        connectWallet,
        nfts,
        setNfts,
        miladys,
        milads,
        mililys,
        pixeladys,
        auras,
        cdbs,
        derivs,
        allstarz,
        remilios,
        radbros,
        banners,
        customChoice,
        setCustomChoice,
        sizeChoice,
        setSizeChoice,
        colorChoice,
        setColorChoice,
        checked,
        setChecked,
        customText,
        setCustomText,
        resetDefaults,
        preview,
        setPreview,
        menuVisible,
        setMenuVisible,
        handleClickScroll,
        scrollTo

      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);
