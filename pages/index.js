import React from 'react'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'


import { client } from '../lib/client'

import {Product, FooterBanner, HeroBanner, Header} from '../components'


const Home = ({ products, bannerData }) => (
  <div>
    {/*<HeroBanner heroBanner={bannerData.length && bannerData[0]}  />*/}
    <Header />

    <div className="products-heading">
    </div>

    <div className='products-collection-container'  id="nobody">

      <h2>by nobody</h2>

      <div className="products-container">
        {products?.sort(function (a, b) {
          const nameA = a.name.toUpperCase()
          const nameB = b.name.toUpperCase()
          if (nameA < nameB){
            return -1
          }
          if (nameA > nameB){
            return 1
          }
          return 0
        }).map((product) => product.collection === 'originals' && <Product key={product._id} product={product} />)}
      </div>

    </div>

    <div className='products-collection-container' id="cdb">

      <h2>cryptodickbutts</h2>

      <div className="products-container">
        {products?.sort(function (a, b) {
          const nameA = a.name.toUpperCase()
          const nameB = b.name.toUpperCase()
          if (nameA < nameB){
            return -1
          }
          if (nameA > nameB){
            return 1
          }
          return 0
        }).map((product) => product.collection === 'cdb' && <Product key={product._id} product={product} />)}
      </div>

    </div>



    <div className='products-collection-container' id="milady">

      <h2>milady</h2>

      <div className="products-container">
        {products?.sort(function (a, b) {
          const nameA = a.name.toUpperCase()
          const nameB = b.name.toUpperCase()
          if (nameA < nameB){
            return -1
          }
          if (nameA > nameB){
            return 1
          }
          return 0
        }).map((product) => product.collection === 'milady' &&
        <Product key={product._id} product={product} />)}
      </div>

    </div>

    <div className='products-collection-container' id="milady aura">

      <h2>milady aura</h2>

      <div className="products-container">
      {products?.map((product) => product.collection === 'aura' && <Product key={product._id} product={product} />)}
      </div>

    </div>

    <div className='products-collection-container' id="milady deriv">

      <h2>milAIdy & spring miaura</h2>

      <div className="products-container">
        {products?.map((product) => (product.collection === 'milaidy' || product.collection === 'miaura' || product.collection === 'milady-deriv') && <Product key={product._id} product={product} />)}
      </div>

    </div>



    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </div>
);

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home;
