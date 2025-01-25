import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''

  });
  const { navigate } = useContext(ShopContext)

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
     setFormData(prev => ({ ...prev, [name]: value }));
  }

  console.log(formData, "data");
  

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side  */}
      <div className='flex- flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3 my-2'>
          <input required type='text' name='firstName' onChange={handleChange} value={formData.firstName} placeholder='First name' className='border border-gray-300 px-3.5 rounded py-1.5 w-full' />
          <input required type='text' name='lastName' onChange={handleChange} value={formData.lastName} placeholder='Last name' className='border border-gray-300 rounded px-3.5 py-1.5 w-full' />

        </div>
        <input required type='email' name='email' onChange={handleChange} value={formData.email} placeholder='Email address' className='border my-2 border-gray-300 px-3.5 rounded py-1.5 w-full' />
        <input required type='text' name='street' onChange={handleChange} value={formData.street} placeholder='Street' className='border border-gray-300 px-3.5 rounded py-1.5 w-full' />
        <div className='flex gap-3 my-2'>
          <input required type='text' name='city' onChange={handleChange} value={formData.city} placeholder='City' className='border border-gray-300 px-3.5 rounded py-1.5 w-full' />
          <input required type='text' name='state' onChange={handleChange} value={formData.state} placeholder='State' className='border border-gray-300 rounded px-3.5 py-1.5 w-full' />

        </div>
        <div className='flex gap-3 my-2'>
          <input required type='number' name='zipcode' onChange={handleChange} value={formData.zipcode} placeholder='ZipCode' className='border border-gray-300 px-3.5 rounded py-1.5 w-full' />
          <input required type='text' name='country' onChange={handleChange} value={formData.country} placeholder='Country' className='border border-gray-300 rounded px-3.5 py-1.5 w-full' />

        </div>
        <input required type='phone' name='phone' onChange={handleChange} value={formData.phone} placeholder='Phone' className='border border-gray-300 px-3.5 rounded py-1.5 w-full' />

      </div>


      {/* Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* Payment Method Selection */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}>

              </p>
              <img src={assets.stripe_logo} className='h-5 mx-4' />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}>

              </p>
              <img src={assets.razorpay_logo} className='h-5 mx-4' />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}>

              </p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
              {/* <img src={assets.} className='h-5 mx-4'  /> */}
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type="submit" className='bg-black text-white px-16 py-3 text-sm'>Place Order</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PlaceOrder