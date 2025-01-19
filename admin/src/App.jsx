import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useState } from 'react';
import Login from './components/Login';
import { useEffect } from 'react';


export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '$';

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }

  }, [token])


  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === '' ? <Login setToken={setToken} /> : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>

          {/* <Footer /> */}
        </>
      )}

    </div>
  )
}

export default App