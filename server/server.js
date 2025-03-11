import express from 'express';
import dotenv from 'dotenv';
import TestRoute from "./routes/test.js"
import DoubtRoute from "./routes/doubt.js"
import dbConnect from './utils/dbConnect.js';

const app = express();
dotenv.config();
dbConnect();

app.use(express.json());
app.use("/test" , TestRoute)
app.use("/doubt" , DoubtRoute)

app.get('/', (req, res) => {
    return res.json({ message: 'Hello World' });
})

app.listen(4000, () => {
    console.log('Server started on http://localhost:4000');
})
