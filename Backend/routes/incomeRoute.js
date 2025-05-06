const express = require('express');
const Income = require('../models/incomeModel')
const {getincomes,
        getincome,
        postincome,
        putincome} = require('../controller/incomeController')

const router = express.Router();

router.get('/', getincomes);

router.get('/:id', getincome);

router.post('/', postincome);

router.put('/:id', putincome);

module.exports = router;