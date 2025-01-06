import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';

// App config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();
// middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send('API WORKING!')
}
)

app.listen(PORT, () => {
    console.log('Server Started on PORT : ' + PORT);

})