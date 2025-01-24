import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';


// placing order using cod

const placeOrder = async (req, res) => {
    try {
        const { userId, amount, address, items } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();
        
        // reset cart data after placing success order
        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: 'Order Placed' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message  })
    }
}


// placing order using stripe

const placeOrderStripe = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}


// placing order using razorpay

const placeOrderRazorpay = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}


// All Orders Data for Admin Panel

const allOrders = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}


// user Order Data For Frontend

const userOrders = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

// update Order Status from admin


const updateStatus = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, updateStatus, userOrders }