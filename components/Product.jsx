import React, { useState } from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Product = ({ product: { image, name, slug, price, details }}) => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          {image && (<img
            src={urlFor(image && image[index])}
            // width={250}
            height={250}
            className="product-image"
          />)}

          <p className="product-name"><i>{name}</i></p>


          <div className="small-images-container">
            {image && (image.slice(0,4)?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            )))}
          </div>

          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product
