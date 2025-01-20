import { createContext, useEffect } from "react"
// import { products } from '../assets/assets'
import { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
   const currency = '$';
   const delivery_fee  = 10; 
   const pwToken = localStorage.getItem('token');
   const backendUrl = import.meta.env.VITE_BACKEND_URL;
   const [search, setSearch] = useState('');
   const [showSearch, setShowSearch] = useState(false);
   const [cartItems, setCartItems] = useState({});
   const [products, setProducts] = useState([]);
   const [token, setToken] = useState(pwToken ? pwToken : '');
   const navigate = useNavigate()

   const addToCart = async (itemId, size) => {

        if(!size) {
          toast.error('Select Product Size');
          return;
        }

        let cartData = structuredClone(cartItems);
        if(cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

   }

   const getCartCount = () => {
     let totalCount = 0;
     for(const items in cartItems) {
        for(const item in cartItems[items]) {
            try {
                if (cartItems[items][item] > 0) {
                  totalCount += cartItems[items][item];
                }
            } catch (error) {
                
            }
        }
     }

     return totalCount;
   }

   useEffect(() => {
     console.log(cartItems, "ites=>");
     
   }, [cartItems])

   const updateQuantity = async (itemId, size, quantity) => {
      let cartData = structuredClone(cartItems);
      cartData[itemId][size] = quantity;
      setCartItems(cartData);
   }

   const getCartAmount = () => {
      let totalAmount = 0;
      for(const items in cartItems) {
        let itemInfo = products.find(product => product._id === items);
        for (const item in cartItems[items]) {
          try {
            if (cartItems[items][item] > 0) {
              totalAmount += itemInfo.price * cartItems[items][item]
            }
          } catch (error) {
            
          }
        }
      }
      return totalAmount;
   } 

   const getProductsData = async () => {
    try {
      const res = await axios.get(backendUrl + '/api/product/list');
      console.log(res.data);
      if(res.data.success) {
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message)
        setProducts([])
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      setProducts([])
    }
   } 

   useEffect(() => {
      getProductsData()
   }, [])


    const value = {
      products,
      currency,
      delivery_fee,
      search,
      setSearch,
      showSearch,
      setShowSearch,
      cartItems,
      addToCart,
      getCartCount,
      updateQuantity,
      getCartAmount,
      navigate,
      backendUrl,
      token,
      setToken,
      setCartItems
    }

    // 1;09:17 stamp

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
