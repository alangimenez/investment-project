const express = require('express');
const router = express.Router();
const tirService = require('../services/tirService');

router.get('/', async (req, res) => {
    res.status(200).json(await tirService.getTir())
})

module.exports = router