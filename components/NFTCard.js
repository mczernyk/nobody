import React, {useState} from "react";
import { useStateContext } from '../context/StateContext';


const NFTCard = ({nft, product}) => {
  const { customChoice, setCustomChoice  } = useStateContext();

  const { image, name, details, price, custom, collection } = product;

  const handleClick = (e, name) => {
    e.preventDefault()
    // console.log('choice', name)
    setCustomChoice(name)
  }

  return (
    <div className="nft-card" onClick={(e) => handleClick(e, nft.meta.name)}>

      <img src={nft.meta.content[nft.meta.content.length-1].url} width="200px" alt={nft.meta.name}/>

      <div className="nft-name">
        {nft.meta.name}
      </div>


    </div>
  )
}

export default NFTCard
