import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import booksRoute from "./routes/booksRoute.js"
import cors from 'cors';


dotenv.config();

const PORT = process.env.PORT;
const server = express();
server.use(express.json());

server.use(cors());

/*
Allow custom origin
server.use(cors({
    origin: 'http://localhost:3000',
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
})
);

*/

server.get('/', (req, res) =>{
    res.status(200).json({message:"Welcome to Books Api"});
});

server.use('/books', booksRoute)

server.listen(PORT, async() => {
    connectDb();
    console.log(`Server Running on http://localhost:${PORT}`);
});