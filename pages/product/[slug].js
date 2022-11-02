import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { AiOutlineMinus, AiOutlinePlus, AiFillFrown, AiFillMeh, AiFillSmile,AiOutlineGlobal, AiOutlineDollar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Product, NFTContainer, NFTCard } from '../../components';
import { useStateContext } from '../../context/StateContext';

import Head from 'next/head'

const ProductDetails = ({ product, products }) => {
  const { image, name, details, details2, price, size, color, custom, collection } = product;
  const [index, setIndex] = useState(0);

  const { decQty, incQty, qty, onAdd, setShowCart, miladys, pixeladys, auras, cdbs, derivs, allstarz, remilios, customChoice, setCustomChoice, connectWallet, walletAddress, sizeChoice, setSizeChoice, checked, setChecked, colorChoice, setColorChoice, resetDefaults, preview, setPreview } = useStateContext();

  useEffect(() => {
    resetDefaults(product)
  }, [])


  const handleChange = (event) => {
    setSizeChoice(event.target.value);
  };

  const handleCheck = () => {
    setChecked(!checked);
    console.log('check', checked)
  };

  const handleChangeColor = (event) => {
    if (collection === 'originals' || collection === 'misc') {
      if (name === "embroidered denim jacket") {
        if (event.target.value === 'black denim') {
          setIndex(0)
          setPreview(0)
        }
        if (event.target.value === 'blue denim') {
          setIndex(2)
          setPreview(2)

        }
        if (event.target.value === 'white denim') {
          setIndex(4)
          setPreview(4)

        }
      }
      if (name === "embroidered dad hat") {
        if (event.target.value === 'sky') {
          setIndex(0)
          setPreview(0)
        }
        if (event.target.value === 'cotton candy') {
          setIndex(1)
          setPreview(1)

        }
        if (event.target.value === 'denim black') {
          setIndex(2)
          setPreview(2)

        }
        if (event.target.value === 'denim blue') {
          setIndex(3)
          setPreview(3)

        }
        if (event.target.value === 'cotton black') {
          setIndex(4)
          setPreview(4)

        }
        if (event.target.value === 'camo') {
          setIndex(5)
          setPreview(5)

        }
      }

      if (name === "embroidered dad hat smile") {
        if (event.target.value === 'cotton candy') {
          setIndex(0)
          setPreview(0)
        }
        if (event.target.value === 'sky') {
          setIndex(1)
          setPreview(1)

        }
        if (event.target.value === 'light denim') {
          setIndex(2)
          setPreview(2)
        }
        if (event.target.value === 'blue denim') {
          setIndex(3)
          setPreview(3)
        }
        if (event.target.value === 'black denim') {
          setIndex(4)
          setPreview(4)
        }
        if (event.target.value === 'cotton white') {
          setIndex(5)
          setPreview(5)
        }
        if (event.target.value === 'cotton red') {
          setIndex(6)
          setPreview(6)
        }
        if (event.target.value === 'cotton tan') {
          setIndex(7)
          setPreview(7)
        }
        if (event.target.value === 'cotton navy') {
          setIndex(8)
          setPreview(8)
        }
        if (event.target.value === 'cotton green') {
          setIndex(9)
          setPreview(9)
        }
        if (event.target.value === 'cotton black') {
          setIndex(10)
          setPreview(10)
        }
        if (event.target.value === 'cotton light blue') {
          setIndex(11)
          setPreview(11)
        }
        if (event.target.value === 'cotton pink') {
          setIndex(12)
          setPreview(12)
        }
        if (event.target.value === 'camo') {
          setIndex(13)
          setPreview(13)
        }
      }

      if (name === "embroidered foam trucker smile") {
        if (event.target.value === 'USA') {
          setIndex(0)
          setPreview(0)
        }
        if (event.target.value === 'black/black') {
          setIndex(1)
          setPreview(1)

        }
        if (event.target.value === 'navy/navy') {
          setIndex(2)
          setPreview(2)

        }
        if (event.target.value === 'denim blue') {
          setIndex(3)
          setPreview(3)

        }
        if (event.target.value === 'white/black') {
          setIndex(4)
          setPreview(4)

        }
        if (event.target.value === 'red/red') {
          setIndex(5)
          setPreview(5)

        }
      }

      if (name === "embroidered beanie") {
        if (event.target.value === 'sky beanie') {
          setIndex(0)
          setPreview(0)
        }
        if (event.target.value === 'cotton candy beanie') {
          setIndex(1)
          setPreview(1)

        }
        if (event.target.value === 'black beanie') {
          setIndex(2)
          setPreview(2)

        }
        if (event.target.value === 'navy beanie') {
          setIndex(3)
          setPreview(3)

        }
        if (event.target.value === 'green beanie') {
          setIndex(4)
          setPreview(4)
        }
        if (event.target.value === 'charcoal beanie') {
          setIndex(5)
          setPreview(5)
        }
        if (event.target.value === 'gray beanie') {
          setIndex(6)
          setPreview(6)
        }
         if (event.target.value === 'red beanie') {
          setIndex(7)
          setPreview(7)
        }
        if (event.target.value === 'gold beanie') {
          setIndex(8)
          setPreview(8)
        }
      }

      if (name === "embroidered bucket hat") {
        if (event.target.value === 'denim multi') {
          setIndex(0)
          setPreview(0)
        }
        if (event.target.value === 'denim black') {
          setIndex(1)
          setPreview(1)

        }
        if (event.target.value === 'denim navy') {
          setIndex(2)
          setPreview(2)

        }
        if (event.target.value === 'denim blue') {
          setIndex(3)
          setPreview(3)

        }
        if (event.target.value === 'cotton white') {
          setIndex(4)
          setPreview(4)

        }

        if (event.target.value === 'cotton black') {
          setIndex(5)
          setPreview(5)

        }
        if (event.target.value === 'cotton olive') {
          setIndex(6)
          setPreview(6)

        }
        if (event.target.value === 'cotton blue') {
          setIndex(7)
          setPreview(7)

        }
        if (event.target.value === 'cotton tan') {
          setIndex(8)
          setPreview(8)

        }
      }

      if (name === "embroidered pattern tee") {
        if (event.target.value === 'marble') {
          setIndex(0)
          setPreview(0)

        }
        if (event.target.value === 'tie dye') {
          setIndex(2)
          setPreview(2)

        }
      }
      if (name === "love tee" || name === "passenger tee" || name === "trust tee" || 'self tee' || 'planet tee') {
        if (event.target.value === 'black') {
          setIndex(0)
          setPreview(0)
        }
        if (event.target.value === 'white') {
          setIndex(2)
          setPreview(2)
        }
        if (event.target.value === 'berry') {
          setIndex(4)
          setPreview(4)
        }
        if (event.target.value === 'navy') {
          setIndex(6)
          setPreview(6)
        }
        if (event.target.value === 'purple') {
          setIndex(8)
          setPreview(8)
        }
        if (event.target.value === 'butter') {
          setIndex(10)
          setPreview(10)
        }
      }
      if (name === "nnn tee") {
        if (event.target.value === 'butter') {
          setIndex(0)
          setPreview(0)
        }
        if (event.target.value === 'purple') {
          setIndex(2)
          setPreview(2)
        }
        if (event.target.value === 'black') {
          setIndex(4)
          setPreview(4)
        }
        if (event.target.value === 'white') {
          setIndex(6)
          setPreview(6)
        }
        if (event.target.value === 'berry') {
          setIndex(8)
          setPreview(8)
        }
        if (event.target.value === 'navy') {
          setIndex(10)
          setPreview(10)
        }
      }

      if (name === "mind tee" || name === "smile tee") {
        if (event.target.value === 'purple') {
          setIndex(0)
          setPreview(0)
        }
        if (event.target.value === 'white') {
          setIndex(2)
          setPreview(2)
        }
        if (event.target.value === 'black') {
          setIndex(4)
          setPreview(4)
        }
        if (event.target.value === 'berry') {
          setIndex(6)
          setPreview(6)
        }
        if (event.target.value === 'navy') {
          setIndex(8)
          setPreview(8)
        }
        if (event.target.value === 'butter') {
          setIndex(10)
          setPreview(10)
        }
      }
      if (name === "smile crop top") {
        if (event.target.value === 'white') {
          setIndex(0)
          setPreview(0)
        }
        if (event.target.value === 'black') {
          setIndex(2)
          setPreview(2)
        }
      }
      if (name === 'no body slides') {
        if (event.target.value === 'white') {
          setIndex(0)
          setPreview(0)
        }
        if (event.target.value === 'black') {
          setIndex(2)
          setPreview(2)
        }
      }
      if (name === 'no body canvas shoes') {
        if (event.target.value === 'apricot white') {
          setIndex(0)
          setPreview(0)
        }
      }


    } else {


      if (event.target.value === 'black') {
        setIndex(0)
        setPreview(0)
      }
      if (event.target.value === 'white') {
        setIndex(2)
        setPreview(2)
      }
      if (event.target.value === 'berry') {
        setIndex(4)
        setPreview(4)
      }
      if (event.target.value === 'navy') {
        setIndex(6)
        setPreview(6)
      }
      if (event.target.value === 'purple') {
        setIndex(8)
        setPreview(8)
      }
      if (event.target.value === 'butter') {
        setIndex(10)
        setPreview(10)
      }
    }


    setColorChoice(event.target.value);
    console.log('color', colorChoice)
  };



  const handleBuyNow = () => {
    onAdd(product, qty, sizeChoice, colorChoice, customChoice, preview, checked);
    setShowCart(true);
  }

  return (
    <div>
      <Head>
        <title>nobody ~ {product.name}</title>
        <meta name="description" content={product.details}/>
        <meta property="image" content={product.image[0].asset._ref.replace('image-', 'https://cdn.sanity.io/images/yiekg475/production/').replace('-png', '.png').replace('-jpg', '.jpg')}/>

        {/*<!-- Facebook Meta Tags -->*/}
        <meta property="og:url" content={`https://www.nobody.clothing/product/${product.slug}`}/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content={product.name}/>
        <meta property="og:description" content={product.details}/>
        <meta property="og:image" content={product.image[0].asset._ref.replace('image-', 'https://cdn.sanity.io/images/yiekg475/production/').replace('-png', '.png').replace('-jpg', '.jpg')}/>

        {/*<!-- Twitter Meta Tags -->*/}
        <meta name="twitter:card" content="summary_large_image"/>
        <meta property="twitter:domain" content="nobody.clothing"/>
        <meta property="twitter:url" content={`https://www.nobody.clothing/product/${product.slug}`}/>
        <meta name="twitter:title" content={product.name}/>
        <meta name="twitter:description" content={product.details}/>
        <meta name="twitter:image" content={product.image[0].asset._ref.replace('image-', 'https://cdn.sanity.io/images/yiekg475/production/').replace('-png', '.png').replace('-jpg', '.jpg')}/>

      </Head>
      <div className="product-detail-container">
        {image && (<div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
          <div className="small-images-container-slug">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => {
                  setIndex(i)
                  // handleSizeSelect(index)
                }}
              />
            ))}
          </div>
        </div>)}

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
              <AiFillFrown />
              <AiOutlineDollar/>
              <AiFillMeh />
              <AiOutlineGlobal />
              <AiFillSmile />
              {/*<p>
              (20)
            </p>*/}
          </div>
          <h3>details: </h3>
          <p>{details}</p>
          {details2 &&

            <p><br></br>{details2}</p>
          }

          <div className='quantity'>
            <div className="size-box">
              <h3>size: </h3>
              <select id="size" value={sizeChoice} onChange={handleChange}>
                {product.size.map((item, i) => <option key={i} value={item}>{item}</option>)}
              </select>

            </div>
            <div className="size-box">
              <h3>color: </h3>
              <select id="color" value={colorChoice} onChange={handleChangeColor}>
                {color.map((item, i) => <option key={i} value={item}>{item}</option>)}
              </select>
            </div>

          </div>

          {custom && <div className='quantity'>
            <div className="check-box">
              <label className='checkRow'>
                <h3>print without name and #</h3>
                <input
                  type="checkbox"
                  id="checkbox"
                  checked={checked}
                  onChange={handleCheck}
                />
              </label>
            </div>
          </div>}

          <p className="price">${price}</p>

          {custom &&
            <div>
            <h3>connect your wallet and choose an NFT below:</h3>

            {walletAddress==='no wallet connected :('
            ?

            <button type="button" onClick={() => connectWallet()}
            className="connect-wallet">
              Connect Wallet
            </button>
            :
            <button type="button" disabled={true} onClick={() => connectWallet()}
            className="connect-wallet">
              Wallet Connected
            </button>
            }

              {collection === 'milady' &&
                <div>
                  {miladys.length ?
                    (
                    <div>
                      <div className='quantity'>
                        <p>{miladys.length} NFTs found.</p>
                        {customChoice && <p>{customChoice} selected.</p>}
                      </div>
                      <NFTContainer nfts={miladys} product={product}/>
                    </div>
                    ):(
                      <div>
                      <p>no NFTs detected from this collection, try connecting your wallet again please :)</p>
                    </div>
                    )
                  }

                </div>
              }

              {collection === 'pixelady' &&
                <div>
                  {pixeladys.length ?
                    (
                    <div>
                      <div className='quantity'>
                        <p>{pixeladys.length} NFTs found.</p>
                        {customChoice && <p>{customChoice} selected.</p>}
                      </div>
                      <NFTContainer nfts={pixeladys} product={product}/>
                    </div>
                    ):(
                      <div>
                      <p>no NFTs detected from this collection, try connecting your wallet again please :)</p>
                    </div>
                    )
                  }

                </div>
              }


              {collection === 'allstarz' &&
                <div>
                  {allstarz.length ?
                    (
                      <div>
                        <div className='quantity'>
                          <p>{allstarz.length} NFTs found.</p>
                          {customChoice && <p>{customChoice} selected.</p>}
                        </div>
                        <NFTContainer nfts={allstarz} product={product}/>
                      </div>
                      ):(
                      <div>
                        <p>no NFTs detected, try connecting your wallet again please</p>
                      </div>
                    )
                  }

                </div>
              }

              {collection === 'aura' &&
                <div>
                  {auras.length ?
                    (
                      <div>
                        <div className='quantity'>
                          <p>{auras.length} NFTs found.</p>
                          {customChoice && <p>{customChoice} selected.</p>}
                        </div>
                        <NFTContainer nfts={auras} product={product}/>
                      </div>
                      ):(
                      <div>
                        <p>no NFTs detected, try connecting your wallet again please</p>
                      </div>
                    )
                  }

                </div>
              }

              {collection === 'cdb' &&
                <div>
                  {
                    cdbs.length ?
                    (
                      <div>
                        <div className='quantity'>
                          <p>{cdbs.length} NFTs found.</p>
                          {customChoice && <p>{customChoice} selected.</p>}
                        </div>
                        <NFTContainer nfts={cdbs} product={product}/>
                      </div>
                      ):(
                      <div>
                        <p>no NFTs detected, try connecting your wallet again please</p>
                      </div>
                    )
                  }

                </div>
              }
              {collection === 'milady-deriv' &&
                <div>
                  {
                    derivs.length ?
                    (
                      <div>
                        <div className='quantity'>
                          <p>{derivs.length} NFTs found.</p>
                          {customChoice && <p>{customChoice} selected.</p>}
                        </div>
                        <NFTContainer nfts={derivs} product={product}/>
                      </div>
                      ):(
                      <div>
                        <p>no NFTs detected, try connecting your wallet again</p>
                      </div>
                    )
                  }

                </div>
              }

              {collection === 'remilio' &&
                <div>
                  {remilios.length ?
                    (
                      <div>
                        <div className='quantity'>
                          <p>{remilios.length} NFTs found.</p>
                          {customChoice && <p>{customChoice} selected.</p>}
                        </div>
                        <NFTContainer nfts={remilios} product={product}/>
                      </div>
                      ):(
                      <div>
                        <p>no NFTs detected, try connecting your wallet again please</p>
                      </div>
                    )
                  }

                </div>
              }



          </div>
        }









          <div className="quantity">
            <h3>quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>





         <div className="buttons">
            <button disabled={customChoice === '' && custom } type="button" className="add-to-cart" onClick={() => onAdd(product, qty, sizeChoice, colorChoice, customChoice, preview, checked)}>Add to Cart</button>
            <button disabled={customChoice === '' && custom } type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>



        </div>
      </div>

      <div className="home-button">
        <h2>
          <Link href="/" onClick={resetDefaults}>
          go home
          </Link>

        </h2>
      </div>



      <div className="maylike-products-wrapper">
          <h2>more from this collection</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.sort(function (a, b) {
                const nameA = a.name.toUpperCase()
                const nameB = b.name.toUpperCase()
                if (nameA < nameB){
                  return -1
                }
                if (nameA > nameB){
                  return 1
                }
                return 0
              }).map((item) => product.collection === item.collection && (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product }
  }
}

export default ProductDetails
