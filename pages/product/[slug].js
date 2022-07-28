import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillFrown, AiFillMeh, AiFillSmile,AiOutlineGlobal, AiOutlineDollar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Product, NFTContainer, NFTCard } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price, custom, collection } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart, miladys, auras, cdbs, derivs, collectionHelper, nfts, customChoice, setCustomChoice } = useStateContext();
  const [sizeChoice, setSizeChoice] = useState("S")
  const [colorChoice, setColorChoice] = useState("white")



  const handleChange = (event) => {
    setSizeChoice(event.target.value);
  };

  const handleChangeColor = (event) => {
    if (event.target.value === 'white') {
      setIndex(0)
    }
    if (event.target.value === 'black') {
      setIndex(2)
    }
    if (event.target.value === 'berry') {
      setIndex(4)
    }

    setColorChoice(event.target.value);
    console.log('color', colorChoice)
  };



  const handleBuyNow = () => {
    onAdd(product, qty, sizeChoice, colorChoice, customChoice);

    setShowCart(true);
  }

  return (
    <div>
      <div className="product-detail-container">
        {image && (<div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
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

          <div className='quantity'>
            <div className="size-box">
              <h3>size: </h3>
              <select id="size" value={sizeChoice} onChange={handleChange}>
                {product.size.map((item, i) => <option key={i} value={item}>{item}</option>)}
              </select>

            </div>
            <div className="size-box">
            <h3>color: </h3>
            <select id="size" value={colorChoice} onChange={handleChangeColor}>
              {product.color.map((item, i) => <option key={i} value={item}>{item}</option>)}
            </select>

          </div>

          </div>

          <p className="price">${price}</p>

          {custom &&
            <div>
            <h3>click to choose an NFT:</h3>
              {collection === 'milady' &&
                <div>
                  {miladys.length ?
                    (<div>
                    <p>{miladys.length} NFTs found</p>
                      <NFTContainer nfts={miladys} product={product}/>
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
                    (<div>
                      <p>{auras.length} NFTs found</p>
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
                    (<div>
                      <p>{cdbs.length} NFTs found</p>
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
                    (<div>
                      <p>{derivs.length} NFTs found</p>
                      <NFTContainer nfts={derivs} product={product}/>
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
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty, sizeChoice, colorChoice, customChoice)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>more from this collection</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => product.collection === item.collection && (
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
