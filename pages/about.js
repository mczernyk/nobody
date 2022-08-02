import React from 'react'
import Link from 'next/link';


export default function about() {
  return (
    <div className="about-container">
      <h1>about</h1>
        <div className='about-content'>
          <p>nobody offers products from a curated list of NFT collections featuring your CC0 assets. you own your NFTs, now you can do something with them.</p>

          <p>nobody also offers original gear as well as pieces from these collections featuring CC0 assets from nobody's vault. NFTs can be expensive, nobody allows customers to support projects without owning their assets. the choices for each collection will be rotated periodically based on holdings in nobody's vault.</p>

          <p>nobody uses 20% of profits from sales to sweep the floor of each respective collection. nobody does so once this profit allocation reaches the floor price.</p>

          <p>nobody limits the amount of products sold daily. currently 25 orders are accepted per day. the store reopens every day at 11AM EST.</p>

          <p>nobody offers a 10% collection discount for the best selling collection for one day each month. this sale day is announced on twitter.</p>

          <h2>♡ nobody loves you ♡</h2>
          <h3>
          <Link href="/">
          go home
          </Link>

          </h3>

        </div>


    </div>
  )
}
