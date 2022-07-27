import React from "react";

const NFTCard = ({nft}) => {
  return (
    <div>
      <img src={nft.meta.content[nft.meta.content.length-1].url} width="200px" alt={nft.meta.name} />
      <div>
        {nft.meta.name}
      </div>


    </div>
  )
}

export default NFTCard
