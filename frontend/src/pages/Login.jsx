import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const { token, backendUrl, setToken, navigate } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        try {
          const res = await axios.post(backendUrl + '/api/user/register', { name, password, email })
          if (res.data.success) {
            setToken(res.data.token);
            localStorage.setItem('token', res.data.token);
          } else {
            toast.error(res.data.message)
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }

      } else {
        try {
          const res = await axios.post(backendUrl + '/api/user/login', { password, email })
          if (res.data.success) {
            setToken(res.data.token);
            localStorage.setItem('token', res.data.token);
          } else {
            toast.error(res.data.message)
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }
      }
    } catch (error) {

    }
  } 

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form onSubmit={onSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? null : <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />}
      <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>
          Forgot your password?
        </p>
        {
          currentState === 'Login' ? (
            <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>
          ) : (
            <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
          )
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>

    </form>
  )
}

export default Login