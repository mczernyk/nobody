import React from "react";
import NFTCard from "./NFTCard"

const NFTContainer = ({nfts, product}) => {

  return (
    <div className="nft-container">
      {nfts.map((nft, i) => {
        return <NFTCard nft={nft} product={product} key={i}/>
      })}
    </div>
  )
}

export default NFTContainer
