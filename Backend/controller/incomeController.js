const Income = require('../models/incomeModel')
const asyncHandler = require('express-async-handler')

const getincomes = asyncHandler(async(req, res) => {
    try{
        const income = await Income.find({});
        res.status(200).json(income);
    }catch (error){
        res.status(500);
        throw new Error(error.massage);
       // console.log(error.massage);
       // res.status(500).json({message: error.massage})
    }
})

const getincome = asyncHandler(async(req, res) => {
    try{
        const {id} = req.params;
        const income = await Income.findById(id);
        res.status(200).json(income);
    }catch (error){
        res.status(500);
        throw new Error(error.massage);
       // console.log(error.massage);
        //res.status(500).json({message: error.massage})
    }
})

const postincome = asyncHandler(async(req, res) => {
    try{
        const income = await Income.create(req.body)
        res.status(200).json(income);
    }catch (error){
        res.status(500);
        throw new Error(error.massage);
        // console.log(error.massage);
        // res.status(500).json({message: error.massage})
    }
})

const putincome = asyncHandler(async(req, res) => {
    try{
        const {id} = req.params;
        const income = await Income.findByIdAndUpdate(id, req.body);
        if(!income){
            res.status(404);
            throw new Error('cannot find any incame with ID ${id}');
          //return res.status(404).json({message: 'cannot find any product with ID ${id}'})
        }
        res.status(200).json(income);
    }catch (error){
        res.status(500);
        throw new Error(error.massage);
       // console.log(error.massage);
       // res.status(500).json({message: error.massage})
    }
})

module.exports = {
    getincomes,
    getincome,
    postincome,
    putincome
};