import React, {useState} from "react";
import { useStateContext } from '../context/StateContext';


const NFTCard = ({nft, product}) => {
  const { image, name, details, price, custom, collection } = product;

  const customChooser = (choice) => {
    console.log('choice', choice)
    // setCustomChoice(nft.meta.name)
  }

  return (
    <div className="nft-card">
      <img src={nft.meta.content[nft.meta.content.length-1].url} width="200px" alt={nft.meta.name} />
      <div className="nft-name">
        {nft.meta.name}
      </div>


    </div>
  )
}

export default NFTCard
