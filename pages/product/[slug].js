import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar, AiFillEye, AiFillFrown, AiFillHeart, AiFillMeh, AiFillSmile, AiFillThunderbolt, AiOutlineAim, AiOutlineFrown, AiOutlineGlobal, AiOutlineMeh, AiOutlineSmile, AiOutlineWarning, AiOutlineThunderbolt, AiFillWarning, AiOutlineColumnHeight, AiOutlineDollarCircle } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  const [sizeChoice, setSizeChoice] = useState("S")

  const handleChange = (event) => {
    setSizeChoice(event.target.value);
  };

  const handleBuyNow = () => {
    onAdd(product, qty, sizeChoice);

    setShowCart(true);
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
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
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillFrown />
              <AiOutlineGlobal />
              <AiFillMeh />
              <AiOutlineDollarCircle/>
              <AiFillSmile />
            </div>
            {/*<p>
              (20)
            </p>*/}
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <div className="size-box">
            <h4>Size: </h4>
            <select id="size" value={sizeChoice} onChange={handleChange}>
              {product.size.map((item, i) => <option key={i} value={item}>{item}</option>)}
            </select>
          </div>
          <p className="price">${price}</p>



          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty, sizeChoice)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
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
