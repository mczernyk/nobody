import React, {useState} from "react";
import { useStateContext } from '../context/StateContext';
import { getNFTImageUrl, getNFTName } from '../lib/opensea';


const NFTCard = ({nft, product}) => {
  const { customChoice, setCustomChoice  } = useStateContext();

  const { image, name, details, price, custom, collection } = product;

  const handleClick = (e, name) => {
    e.preventDefault()
    // console.log('choice', name)
    setCustomChoice(name)
  }

  const nftName = getNFTName(nft);
  const nftImageUrl = getNFTImageUrl(nft);

  return (
    <div className="nft-card" onClick={(e) => handleClick(e, nftName)}>
      <img
        src={nftImageUrl}
        width="200px"
        alt={nftName}
        onError={(e) => {
          e.target.src = '/nbCircle.png'; // Fallback image
        }}
      />

      <div className="nft-name">
        {nftName}
      </div>
    </div>
  )
}

export default NFTCard
