import React from 'react'
import { assets } from '../assets/assets';


const Add = () => {
  return (
    <form >
      <div>
        <p>Upload Image</p>
        <div>
          <label htmlFor=''>
            <img src={assets.upload_area} />
            <input type='file' id='image1' hidden />
          </label>
        </div>
      </div>
    </form >
  )
}

export default Add