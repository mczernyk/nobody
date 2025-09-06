import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getAllCollectionNFTs } from '../lib/opensea';

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
  const [miladyStations, setMiladyStations] = useState([])
  const [derivs, setDerivs] = useState([])
  const [allstarz, setAllstarz] = useState([])
  const [remilios, setRemilios] = useState([])
  const [radbros, setRadbros] = useState([])
  const [dadbros, setDadbros] = useState([])
  const [mifairys, setMifairys] = useState([])






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

      console.log('MetaMask accounts:', accounts);
      console.log('First account:', accounts[0]);
      console.log('Account type:', typeof accounts[0]);

      setWalletAddress(accounts[0])

      let abbvAddy = accounts[0].slice(0,5) + '...' + accounts[0].slice(-4)

      setAbbvWalletAddress(abbvAddy)

      // console.log('MetaMask is installed!');
      toast.success(`wallet connected ;)`);
    }
  }

  const getNFTData = async () => {
    if (!walletAddress || walletAddress === 'no wallet connected :(') {
      return;
    }

    try {
      console.log('=== NFT FETCH DEBUG ===');
      console.log('Raw wallet address from state:', walletAddress);
      console.log('Wallet address type:', typeof walletAddress);
      console.log('Wallet address length:', walletAddress.length);
      console.log('========================');

      const collectionNFTs = await getAllCollectionNFTs(walletAddress);

      // Set all NFT collections
      setMiladys(collectionNFTs.miladys);
      setPixeladys(collectionNFTs.pixeladys);
      setAuras(collectionNFTs.auras);
      setCdbs(collectionNFTs.cdbs);
      setBanners(collectionNFTs.banners);
      setDerivs(collectionNFTs.derivs);
      setAllstarz(collectionNFTs.allstarz);
      setRemilios(collectionNFTs.remilios);
      setRadbros(collectionNFTs.radbros);
      setDadbros(collectionNFTs.dadbros);
      setMililys(collectionNFTs.mililys);
      setMilads(collectionNFTs.milads);
      setMifairys(collectionNFTs.mifairys);
      setMiladyStations(collectionNFTs.miladyStations);

      // Set all NFTs for general use
      const allNFTs = Object.values(collectionNFTs).flat();
      setNfts(allNFTs);

      console.log('NFTs fetched successfully:', allNFTs.length, 'total NFTs');

    } catch (error) {
      console.error('Error fetching NFT data:', error);
      toast.error('Failed to fetch NFT data. Please try again.');
    }
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
        dadbros,
        banners,
        mifairys,
        miladyStations,
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
