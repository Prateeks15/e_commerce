import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <>
      <Navbar />
     <hr />
      <Routes>
        <Route path='/add' element={<Add />} />
        <Route path='/list' element={<List />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
      {/* <Footer /> */}
      </>
    </div>
  )
}

export default App