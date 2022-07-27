import React from "react";

const NFTCard = ({nft}) => {
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
