// OpenSea API integration for NFT wallet functionality
// Replaces the deprecated Rarible API

const OPENSEA_API_BASE = 'https://api.opensea.io/api/v1';
const OPENSEA_API_KEY = process.env.NEXT_PUBLIC_OPENSEA_API_KEY;

// Collection contract addresses mapping
const COLLECTION_ADDRESSES = {
  milady: '0x5af0d9827e0c53e4799bb226655a1de152a425a5',
  pixelady: '0x8fc0d90f2c45a5e7f94904075c952e0943cfccfd',
  aura: '0x2fc722c1c77170a61f17962cc4d039692f033b43',
  banner: '0x1352149cd78d686043b504e7e7d96c5946b0c39c',
  deriv: '0x3a007afa2dff13c9dc5020acae1bcb502d4312e2',
  deriv2: '0x0d8a3359182dca59ccaf36f5c6c6008b83ceb4a6',
  cdb: '0x42069abfe407c60cf4ae4112bedead391dba1cdb',
  allstarz: '0xec0a7a26456b8451aefc4b00393ce1beff5eb3e9',
  remilio: '0xd3d9ddd0cf0a5f0bfb8f7fceae075df687eaebab',
  radbro: '0xabcdb5710b88f456fed1e99025379e2969f29610',
  milily: '0x71481a928c24c32e4d9a4394fab3168a3a1cfd11',
  milad: '0x61628d84d0871a38f102d5f16f4e69ee91d6cdd9',
  mifairy: '0x67b5ee6e29a4230177dda07ad7848e42d89cf9a0',
  miladyStation: '0xb24bab1732d34cad0a7c7035c3539aec553bf3a0'
};

// Get all NFTs owned by a wallet address
export const getWalletNFTs = async (walletAddress) => {
  if (!walletAddress || walletAddress === 'no wallet connected :(') {
    console.log('No wallet address provided');
    return [];
  }

  try {
    // Clean and validate the wallet address
    let cleanAddress = walletAddress.toLowerCase().trim();

    // Remove any @ symbols from the beginning
    cleanAddress = cleanAddress.replace(/^@+/, '');

    // Ensure it starts with 0x
    if (!cleanAddress.startsWith('0x')) {
      cleanAddress = '0x' + cleanAddress;
    }

    // Ensure it's a valid Ethereum address
    if (cleanAddress.length !== 42) {
      console.error('Invalid wallet address format:', walletAddress, '-> cleaned:', cleanAddress);
      return [];
    }

    const headers = {
      'Accept': 'application/json',
    };

    // Add API key if available
    if (OPENSEA_API_KEY && OPENSEA_API_KEY !== 'your_opensea_api_key_here') {
      headers['X-API-KEY'] = OPENSEA_API_KEY;
      console.log('Using OpenSea API key');
    } else {
      console.log('No valid OpenSea API key found');
    }

    // Use our Next.js API proxy to avoid CORS issues
    const url = `/api/opensea?owner=${cleanAddress}`;
    console.log('=== OPENSEA API DEBUG ===');
    console.log('Original wallet address:', walletAddress);
    console.log('Cleaned wallet address:', cleanAddress);
    console.log('Final URL:', url);
    console.log('Using Next.js API proxy to avoid CORS');
    console.log('========================');

    const response = await fetch(url);

    console.log('OpenSea API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenSea API error response:', errorText);
      throw new Error(`OpenSea API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('OpenSea API response data:', data);
    console.log('Total NFTs found:', data.nfts?.length || 0); // OpenSea API v2 uses 'nfts'

    // Debug: Show unique collections in the response
    if (data.nfts && data.nfts.length > 0) {
      const uniqueCollections = [...new Set(data.nfts.map(nft => nft.collection))];
      console.log('Unique collections found:', uniqueCollections);
      console.log('Sample NFT structure:', data.nfts[0]);
    }

    return data.nfts || [];
  } catch (error) {
    console.error('Error fetching NFTs from OpenSea:', error);
    return [];
  }
};

// Filter NFTs by collection contract address
export const filterNFTsByCollection = (nfts, collectionAddress) => {
  if (!nfts || !collectionAddress) {
    console.log('No NFTs or collection address provided for filtering');
    return [];
  }

  const filtered = nfts.filter(nft =>
    nft.contract &&
    nft.contract.toLowerCase() === collectionAddress.toLowerCase()
  );

  console.log(`Filtering NFTs for collection ${collectionAddress}:`, {
    totalNFTs: nfts.length,
    filteredCount: filtered.length,
    sampleContracts: nfts.slice(0, 3).map(nft => nft.contract),
    allContracts: nfts.map(nft => nft.contract).slice(0, 10) // Show first 10 contracts for debugging
  });

  return filtered;
};

// Get NFTs for all supported collections
export const getAllCollectionNFTs = async (walletAddress) => {
  const allNFTs = await getWalletNFTs(walletAddress);

  return {
    miladys: filterNFTsByCollection(allNFTs, COLLECTION_ADDRESSES.milady),
    pixeladys: filterNFTsByCollection(allNFTs, COLLECTION_ADDRESSES.pixelady),
    auras: filterNFTsByCollection(allNFTs, COLLECTION_ADDRESSES.aura),
    banners: filterNFTsByCollection(allNFTs, COLLECTION_ADDRESSES.banner),
    derivs: [
      ...filterNFTsByCollection(allNFTs, COLLECTION_ADDRESSES.deriv),
      ...filterNFTsByCollection(allNFTs, COLLECTION_ADDRESSES.deriv2)
    ],
    cdbs: filterNFTsByCollection(allNFTs, COLLECTION_ADDRESSES.cdb),
    allstarz: filterNFTsByCollection(allNFTs, COLLECTION_ADDRESSES.allstarz),
    remilios: filterNFTsByCollection(allNFTs, COLLECTION_ADDRESSES.remilio),
    radbros: filterNFTsByCollection(allNFTs, COLLECTION_ADDRESSES.radbro),
    dadbros: [], // Empty as in original code
    mililys: filterNFTsByCollection(allNFTs, COLLECTION_ADDRESSES.milily),
    milads: filterNFTsByCollection(allNFTs, COLLECTION_ADDRESSES.milad),
    mifairys: filterNFTsByCollection(allNFTs, COLLECTION_ADDRESSES.mifairy),
    miladyStations: filterNFTsByCollection(allNFTs, COLLECTION_ADDRESSES.miladyStation)
  };
};

// Get NFT image URL (OpenSea v2 format)
export const getNFTImageUrl = (nft) => {
  if (!nft) return '';

  // Try different image URL properties from OpenSea v2 API
  return nft.image_url ||
         nft.image_original_url ||
         nft.image_preview_url ||
         nft.image_thumbnail_url ||
         nft.collection?.image_url ||
         '';
};

// Get NFT name (OpenSea v2 format)
export const getNFTName = (nft) => {
  if (!nft) return '';

  return nft.name ||
         nft.collection?.name ||
         `${nft.collection?.name || 'NFT'} #${nft.identifier || ''}`;
};
