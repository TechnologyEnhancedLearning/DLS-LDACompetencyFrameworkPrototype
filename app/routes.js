// External dependencies
const express = require('express');
const router = express.Router();
const { frameworks } = require('./test-data/frameworks.js');

router.get('/dashboard', (req, res) => {
    res.render("dashboard", {frameworks: frameworks})
});

module.exports = router;
