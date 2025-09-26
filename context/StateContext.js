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
  const [bonklers, setBonklers] = useState([])







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
    // Only run on client side
    if (typeof window === 'undefined') {
      return;
    }

    // Detect available wallets
    const wallets = detectWallets();
    console.log('Detected wallets:', wallets);

    if (wallets.length === 0) {
      toast.error('No wallet extensions detected. Please install MetaMask, Phantom, or another wallet.');
      return;
    }

    // If multiple wallets, let user choose
    if (wallets.length > 1) {
      const selectedWallet = await showWalletSelectionDialog(wallets);
      if (!selectedWallet) {
        toast.info('Wallet selection cancelled');
        return;
      }
      await connectToWallet(selectedWallet);
    } else {
      // Only one wallet detected, connect directly
      await connectToWallet(wallets[0]);
    }
  }

  const connectToWallet = async (wallet) => {
    try {
      console.log(`=== CONNECTING TO ${wallet.name.toUpperCase()} ===`);
      console.log(`Wallet ID: ${wallet.id}`);
      console.log(`Wallet Provider:`, wallet.provider);

      // For MetaMask, add a small delay to allow full initialization
      if (wallet.id === 'metamask') {
        console.log('⏳ Waiting for MetaMask to fully initialize...');
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Request account access first to ensure we have permission
      const accounts = await wallet.provider.request({
        method: 'eth_requestAccounts'
      });
      console.log(`${wallet.name} returned accounts:`, accounts);
      console.log(`Number of accounts: ${accounts.length}`);

      if (accounts.length === 0) {
        toast.error(`No accounts available in ${wallet.name}`);
        return;
      }

      let selectedAccount = accounts[0];
      console.log(`Initial selected account: ${selectedAccount}`);

      // For MetaMask specifically, we need to force account selection
      // because selectedAddress is often undefined due to wallet conflicts
      if (wallet.id === 'metamask') {
        console.log(`MetaMask selectedAddress: ${wallet.provider.selectedAddress}`);
        console.log(`MetaMask isMetaMask: ${wallet.provider.isMetaMask}`);

        // Force MetaMask to show account selection by requesting permissions first
        try {
          console.log('🔧 Forcing MetaMask account selection...');
          await wallet.provider.request({
            method: 'wallet_requestPermissions',
            params: [{ eth_accounts: {} }]
          });
          console.log('✅ MetaMask permissions granted');
        } catch (permError) {
          console.log('⚠️ Permission request failed (this is often normal):', permError);
        }
      }

      // Always check for multiple accounts and show selection dialog if needed
      try {
        const allAccounts = await wallet.provider.request({
          method: 'eth_accounts'
        });

        console.log(`=== ACCOUNT SELECTION LOGIC ===`);
        console.log(`All accounts from ${wallet.name}:`, allAccounts);
        console.log(`All accounts length: ${allAccounts.length}`);
        console.log(`Current selectedAccount: ${selectedAccount}`);

        // For MetaMask, always show account selection dialog if multiple accounts exist
        // because selectedAddress is unreliable due to wallet conflicts
        if (wallet.id === 'metamask' && allAccounts.length > 1) {
          console.log('🚨 METAMASK WITH MULTIPLE ACCOUNTS - FORCING SELECTION DIALOG');
          const accountOptions = allAccounts.map(account => ({
            address: account,
            display: `${account.slice(0,6)}...${account.slice(-4)}`,
            isSelected: account === selectedAccount
          }));

          console.log('MetaMask account options for dialog:', accountOptions);

          const userSelectedAddress = await showAccountSelectionDialog(accountOptions);
          if (userSelectedAddress) {
            selectedAccount = userSelectedAddress;
            console.log(`✅ User selected MetaMask account: ${selectedAccount}`);
          } else {
            console.log('❌ MetaMask account selection cancelled');
            toast.info('Account selection cancelled');
            return;
          }
        } else if (allAccounts.length > 1) {
          console.log('🚨 MULTIPLE ACCOUNTS DETECTED - SHOWING SELECTION DIALOG');
          const accountOptions = allAccounts.map(account => ({
            address: account,
            display: `${account.slice(0,6)}...${account.slice(-4)}`,
            isSelected: account === selectedAccount
          }));

          console.log('Account options for dialog:', accountOptions);

          const userSelectedAddress = await showAccountSelectionDialog(accountOptions);
          if (userSelectedAddress) {
            selectedAccount = userSelectedAddress;
            console.log(`✅ User selected account: ${selectedAccount}`);
          } else {
            console.log('❌ Account selection cancelled');
            toast.info('Account selection cancelled');
            return;
          }
        } else if (allAccounts.length === 1) {
          // Only one account, use it
          selectedAccount = allAccounts[0];
          console.log(`📝 Only one account available: ${selectedAccount}`);
        } else {
          console.log('⚠️ No accounts found in eth_accounts');
        }
      } catch (error) {
        console.log('❌ Could not get all accounts for selection:', error);
      }

      // Set the selected account
      setWalletAddress(selectedAccount);
      let abbvAddy = selectedAccount.slice(0,5) + '...' + selectedAccount.slice(-4);
      setAbbvWalletAddress(abbvAddy);
      toast.success(`Connected to ${wallet.name}: ${abbvAddy}`);

      // Listen for account changes
      wallet.provider.on('accountsChanged', (newAccounts) => {
        if (newAccounts.length > 0) {
          console.log('Account changed to:', newAccounts[0]);
          setWalletAddress(newAccounts[0]);
          let newAbbvAddy = newAccounts[0].slice(0,5) + '...' + newAccounts[0].slice(-4);
          setAbbvWalletAddress(newAbbvAddy);
          toast.success('Wallet account switched');
        } else {
          setWalletAddress('no wallet connected :(');
          setAbbvWalletAddress('');
          toast.info('Wallet disconnected');
        }
      });

    } catch (error) {
      console.error(`Error connecting to ${wallet.name}:`, error);
      if (error.code === 4001) {
        toast.error(`Please connect your wallet in ${wallet.name}`);
      } else {
        toast.error(`Failed to connect to ${wallet.name}`);
      }
    }
  };

  const detectWallets = () => {
    const wallets = [];
    const detectedProviders = new Set();

    console.log('=== WALLET DETECTION ===');
    console.log('window.ethereum:', window.ethereum);
    console.log('window.ethereum?.isMetaMask:', window.ethereum?.isMetaMask);
    console.log('window.phantom:', window.phantom);
    console.log('window.backpack:', window.backpack);
    console.log('window.coinbaseWalletExtension:', window.coinbaseWalletExtension);
    console.log('window.rainbow:', window.rainbow);
    console.log('window.trustwallet:', window.trustwallet);

    // Check for MetaMask
    if (window.ethereum?.isMetaMask) {
      console.log('✅ MetaMask detected');
      wallets.push({
        name: 'MetaMask',
        id: 'metamask',
        provider: window.ethereum
      });
      detectedProviders.add(window.ethereum);
    } else {
      console.log('❌ MetaMask not detected');
    }

    // Check for Phantom
    if (window.phantom?.ethereum) {
      console.log('✅ Phantom detected');
      wallets.push({
        name: 'Phantom',
        id: 'phantom',
        provider: window.phantom.ethereum
      });
      detectedProviders.add(window.phantom.ethereum);
    } else {
      console.log('❌ Phantom not detected');
    }

    // Check for Backpack
    if (window.backpack) {
      console.log('✅ Backpack detected');
      wallets.push({
        name: 'Backpack',
        id: 'backpack',
        provider: window.backpack
      });
      detectedProviders.add(window.backpack);
    } else {
      console.log('❌ Backpack not detected');
    }

    // Check for Coinbase Wallet
    if (window.coinbaseWalletExtension) {
      console.log('✅ Coinbase Wallet detected');
      wallets.push({
        name: 'Coinbase Wallet',
        id: 'coinbase',
        provider: window.coinbaseWalletExtension
      });
      detectedProviders.add(window.coinbaseWalletExtension);
    } else {
      console.log('❌ Coinbase Wallet not detected');
    }

    // Check for Rainbow
    if (window.rainbow) {
      console.log('✅ Rainbow detected');
      wallets.push({
        name: 'Rainbow',
        id: 'rainbow',
        provider: window.rainbow
      });
      detectedProviders.add(window.rainbow);
    } else {
      console.log('❌ Rainbow not detected');
    }

    // Check for Trust Wallet
    if (window.trustwallet) {
      console.log('✅ Trust Wallet detected');
      wallets.push({
        name: 'Trust Wallet',
        id: 'trustwallet',
        provider: window.trustwallet
      });
      detectedProviders.add(window.trustwallet);
    } else {
      console.log('❌ Trust Wallet not detected');
    }

    // Check for other wallets that might be in window.ethereum
    if (window.ethereum && !detectedProviders.has(window.ethereum)) {
      // Try to identify the wallet by checking various properties
      let walletName = 'Unknown Wallet';
      if (window.ethereum.isBraveWallet) {
        walletName = 'Brave Wallet';
      } else if (window.ethereum.isRabby) {
        walletName = 'Rabby';
      } else if (window.ethereum.isTokenPocket) {
        walletName = 'TokenPocket';
      } else if (window.ethereum.isOkxWallet) {
        walletName = 'OKX Wallet';
      } else if (window.ethereum.isBitKeep) {
        walletName = 'BitKeep';
      }

      wallets.push({
        name: walletName,
        id: 'other',
        provider: window.ethereum
      });
    }

    console.log(`=== WALLET DETECTION COMPLETE ===`);
    console.log(`Total wallets detected: ${wallets.length}`);
    console.log('Detected wallets:', wallets.map(w => w.name));
    console.log('================================');

    return wallets;
  };

  const showWalletSelectionDialog = (wallets) => {
    return new Promise((resolve) => {
      // Only run on client side
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        resolve(null);
        return;
      }

      // Create modal overlay
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
      `;

      // Create modal content
      const modal = document.createElement('div');
      modal.style.cssText = `
        background: white;
        padding: 20px;
        border-radius: 8px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      `;

      modal.innerHTML = `
        <h3 style="margin: 0 0 15px 0; color: #333;">Select Wallet</h3>
        <p style="margin: 0 0 15px 0; color: #666;">Multiple wallets detected. Please choose one:</p>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${wallets.map((wallet, index) => `
            <button
              style="
                padding: 12px;
                border: 1px solid #ddd;
                border-radius: 6px;
                background: white;
                cursor: pointer;
                font-size: 14px;
                transition: background-color 0.2s;
              "
              onmouseover="this.style.backgroundColor='#f5f5f5'"
              onmouseout="this.style.backgroundColor='white'"
              data-wallet-index='${index}'
            >
              ${wallet.name}
            </button>
          `).join('')}
        </div>
        <button
          style="
            margin-top: 15px;
            padding: 8px 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background: #f5f5f5;
            cursor: pointer;
            font-size: 14px;
          "
          onclick="this.closest('[style*=\"position: fixed\"]').remove()"
        >
          Cancel
        </button>
      `;

      // Add click handlers
      modal.addEventListener('click', (e) => {
        if (e.target.dataset.walletIndex) {
          const walletIndex = parseInt(e.target.dataset.walletIndex);
          const wallet = wallets[walletIndex];
          overlay.remove();
          resolve(wallet);
        }
      });

      overlay.appendChild(modal);
      document.body.appendChild(overlay);
    });
  };

  // Enhanced account selection dialog with high z-index and prominent styling
  const showAccountSelectionDialog = (accounts) => {
    return new Promise((resolve) => {
      // Only run on client side
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        resolve(null);
        return;
      }

      console.log('🎯 Creating ENHANCED account selection dialog with accounts:', accounts);

      // Create modal overlay with very high z-index
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      `;

      // Create modal content with prominent styling
      const modal = document.createElement('div');
      modal.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 12px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        border: 3px solid #007bff;
        animation: slideIn 0.3s ease-out;
      `;

      // Add CSS animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `;
      document.head.appendChild(style);

      modal.innerHTML = `
        <h2 style="margin: 0 0 20px 0; color: #333; text-align: center; font-size: 24px;">
          🔐 Select Your MetaMask Account
        </h2>
        <p style="margin: 0 0 20px 0; color: #666; font-size: 16px; text-align: center; line-height: 1.5;">
          We detected multiple accounts in your MetaMask wallet. Please select which account you want to connect:
        </p>
        <div id="account-list" style="margin-bottom: 20px;"></div>
        <div style="text-align: center;">
          <button id="cancel-btn" style="
            padding: 12px 24px;
            border: 2px solid #dc3545;
            border-radius: 6px;
            background: white;
            color: #dc3545;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            transition: all 0.2s;
          ">Cancel Connection</button>
        </div>
      `;

      const accountList = modal.querySelector('#account-list');
      const cancelBtn = modal.querySelector('#cancel-btn');

      accounts.forEach((account, index) => {
        const accountDiv = document.createElement('div');
        const isSelected = account.isSelected;
        accountDiv.style.cssText = `
          padding: 15px;
          border: 2px solid ${isSelected ? '#28a745' : '#ddd'};
          border-radius: 8px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: all 0.2s;
          background-color: ${isSelected ? '#d4edda' : 'white'};
          position: relative;
        `;

        accountDiv.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div>
              <div style="font-weight: bold; font-size: 16px; color: #333;">
                ${account.display}${isSelected ? ' ⭐ (Currently Selected in MetaMask)' : ''}
              </div>
              <div style="font-size: 12px; color: #666; margin-top: 4px;">${account.address}</div>
            </div>
            ${isSelected ? '<div style="color: #28a745; font-size: 20px;">✓</div>' : ''}
          </div>
        `;

        accountDiv.addEventListener('click', () => {
          console.log(`✅ User selected account: ${account.address}`);
          document.body.removeChild(overlay);
          document.head.removeChild(style);
          resolve(account.address);
        });

        accountDiv.addEventListener('mouseenter', () => {
          accountDiv.style.backgroundColor = isSelected ? '#c3e6cb' : '#f8f9fa';
          accountDiv.style.borderColor = isSelected ? '#28a745' : '#007bff';
          accountDiv.style.transform = 'translateY(-2px)';
        });

        accountDiv.addEventListener('mouseleave', () => {
          accountDiv.style.backgroundColor = isSelected ? '#d4edda' : 'white';
          accountDiv.style.borderColor = isSelected ? '#28a745' : '#ddd';
          accountDiv.style.transform = 'translateY(0)';
        });

        accountList.appendChild(accountDiv);
      });

      cancelBtn.addEventListener('click', () => {
        console.log('❌ User cancelled account selection');
        document.body.removeChild(overlay);
        document.head.removeChild(style);
        resolve(null);
      });

      cancelBtn.addEventListener('mouseenter', () => {
        cancelBtn.style.backgroundColor = '#dc3545';
        cancelBtn.style.color = 'white';
      });

      cancelBtn.addEventListener('mouseleave', () => {
        cancelBtn.style.backgroundColor = 'white';
        cancelBtn.style.color = '#dc3545';
      });

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          console.log('❌ User clicked outside dialog');
          document.body.removeChild(overlay);
          document.head.removeChild(style);
          resolve(null);
        }
      });

      overlay.appendChild(modal);
      document.body.appendChild(overlay);
      console.log('🎯 ENHANCED account selection dialog created and added to DOM with z-index 999999');
    });
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
      setBonklers(collectionNFTs.bonklers);
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
        bonklers,
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
