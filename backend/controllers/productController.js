import { v2 as cloudinary  } from 'cloudinary';
import productModel from '../models/productModel.js'
// Add Product

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];
        console.log(req.files, "filesres");
        

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        console.log(req.bod, "files");

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url;
            })
        )

        const productData = {
            name,
            description,
            category,
            subCategory,
            price: Number(price),
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now(),
        }

        const product = new productModel(productData);
        await product.save();
        res.json({ success:true, message: 'Product Added' })
        
        


  
    } catch (error) {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
        // const image1 = req.files.image1[0];
        // const image2 = req.files.image2[1];
        // const image3 = req.files.image3[2];
        // const image4 = req.files.image4[3];

        console.log(req.body, "body");
        // console.log(req.files, "files");

        res.json({ message: 'not working fine product' })
        console.log(error);
        
    }
}

// List Product

const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({ });
        res.json(({ success: true, products  }));
    } catch (error) {
        res.json({ message: 'not working list product' })
        console.log(error);
    }
}

// Remove Product

const removeProduct = async (req, res) => {
    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: 'Product Removed' });
    } catch (error) {
        res.json({ message: 'not working remove product' })
        console.log(error);
    }
}

// Get  Product Info

const singleProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.productId)
        res.json({ success: true, product });
    } catch (error) {
         res.json({ message: 'not working single product' })
        console.log(error);
    }
}

export { addProduct, listProducts, removeProduct, singleProduct };