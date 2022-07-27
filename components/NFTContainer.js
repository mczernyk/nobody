import React from "react";
import NFTCard from "./NFTCard"

const NFTContainer = ({nfts, product}) => {

  return (
    <div className="nft-container">
      {nfts.map((nft, index) => {
        return <NFTCard nft={nft} product={product} key={index} />
      })}
    </div>
  )
}

export default NFTContainer
