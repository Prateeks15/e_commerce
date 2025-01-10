import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      {/* <SearchBar />  */}
      <Routes>
        <Route path='/add' element={<Add />} />
        <Route path='/list' element={<List />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  )
}

export default App