import express from 'express';
import { Book } from '../models/book.model.js';

const router = express.Router();

router.get('/', async(req, res) =>{
    try{
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch(error){
        res.status(500).json({success: false, message: error.message, info:"Internal Server Error"});
    }
});

router.get('/:id', async(req, res) =>{
    try{
        const {id} = req.params;

        const book = await Book.findById(id);
        if(!book){
            return res.status(404).json({success:false, message: "Book not found"});
        }
        return res.status(200).json({data: book});
    }
    catch(error){
        res.status(500).json({success: false, message: error.message, info:"Internal Server Error"});
    }
});

router.put('/:id', async(req, res) =>{
    const {id} = req.params;
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).json({success:false, message: "please provide all fields"});
        }
        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).json({success:false, message: 'Book not found'});
        }
        return res.status(200).json({success:true, data: result});
    }
    catch(error){
        return res.status(500).json({success: false, message: error.message, info:"Internal Server Error"});
    }
});


router.post('/', async (req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).json({success:false, message: "please provide all fields"});
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);
        return res.status(200).json({success:true, data: book});
    }
    catch(error){
        res.status(500).json({success:false, message: "Internal Server Error"});
    }
});


router.delete('/:id', async(req, res) =>{
    try{
        const {id} = req.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({success: false, message: "Book not found"});
        }
        return res.status(200).json({success:true, message: "Book deleted Successfully"})
    }
    catch(error){
        return res.status(500).json({success: false, message: error.message, info:"Internal Server Error"});
    }
});

export default router;
