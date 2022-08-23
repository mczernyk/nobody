import React from 'react'
import Link from 'next/link';
import Head from 'next/head'


export default function about() {
  return (
    <div>
    <Head>
      <title>nobody ~ about</title>
      <meta name="description" content="♡ nobody loves you ♡"/>
      <meta property="image" content="/nbCircleBlack.png"/>

      {/*<!-- Facebook Meta Tags -->*/}
      <meta property="og:url" content="https://www.nobody.clothing/"/>
      <meta property="og:type" content="website"/>
      <meta property="og:title" content="nobody ~ about"/>
      <meta property="og:description" content="♡ nobody loves you ♡"/>
      <meta property="og:image" content="/nbCircleBlack.png"/>

      {/*<!-- Twitter Meta Tags -->*/}
      <meta name="twitter:card" content="summary_large_image"/>
      <meta property="twitter:domain" content="nobody.clothing"/>
      <meta property="twitter:url" content="/nbCircleBlack.png"/>
      <meta name="twitter:title" content="nobody ~ about"/>
      <meta name="twitter:description" content="♡ nobody loves you ♡"/>
      <meta name="twitter:image" content="/nbCircleBlack.png"/>
    </Head>

    <div className="about-container">
      <h1>about</h1>
        <div className='about-content'>
          <p>nobody lets you create products from a curated group of NFT collections using assets in your web3 wallet. you own your NFTs, now you can do something with them.</p>

          <p>nobody also sells original gear and pieces featuring assets from nobody's vault. NFTs can be expensive, nobody gives customers a different way to support these projects. offerings from each collection will be rotated periodically based on nobody's holdings.</p>

          <p>nobody uses 20% of profits from sales to sweep the floor of each respective collection. nobody does so once this profit allocation reaches the floor price.</p>

          <p>nobody limits the amount of products sold daily. currently 25 orders are accepted per day. the store reopens every day at 11AM EST.</p>

          <p>nobody offers a 10% collection discount for each month's best selling collection. this sale lasts 24 hours, the sale date is announced on <a className='twitter-about' href="https://twitter.com/nobody_clothing">twitter</a>.</p>

          <p>nobody only ships to US addresses for now. dm us for international orders.</p>

          <h2>♡ nobody loves you ♡</h2>
          <h3>
          <Link href="/">
          go home
          </Link>

          </h3>

        </div>


    </div>



    </div>

  )
}
