import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const Product = () => {

  const { productId } = useParams();
  const { products } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');

  const fetchProductData = async () => {
    const getProductInfo = products.find(item => item._id === productId);
    if (Object.keys(getProductInfo).length > 0) {
      setProductData(getProductInfo);
      setImage(getProductInfo.image[0] ? getProductInfo.image[0] : '');
    } else {
      setImage('')
      setProductData(false);
    }

  }

  // useEffect(() => {
  //   fetchProductData()
  // }, [productId])

  console.log(productData, "data= >>");


  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*  Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-auto justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' />
          </div>
        </div>
        {/* Product Info */}
        <div className='flex-1 '>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon}  alt="" className="w-3 5" />
          <img src={assets.star_icon}  alt="" className="w-3 5" />
          <img src={assets.star_icon}  alt="" className="w-3 5" />
          <img src={assets.star_icon}  alt="" className="w-3 5" />
          </div>
        </div>
      </div>
    </div>
  ) :
    <div>
      No prouct
    </div>
}

export default Product