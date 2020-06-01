// External dependencies
const express = require('express');
const router = express.Router();
const { frameworks } = require('./test-data/frameworks.js');

router.get('/dashboard', (req, res) => {
    res.render('dashboard', {frameworks: frameworks})
});

router.post('/frameworks/new', (req, res) => {
    console.log(req.body);
    res.redirect('working-group');
})

module.exports = router;
