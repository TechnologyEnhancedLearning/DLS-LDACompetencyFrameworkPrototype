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
});

router.get('/frameworks/new', (req, res) => {
    res.render('frameworks/new');
}).get('/frameworks/working-group', (req, res) => {
    res.render('frameworks/working-group');
})

router.get('/frameworks/:slug', (req, res) => {
    const framework = frameworks.filter(f => f.slug === req.params.slug)[0];
    if (!framework) {
        res.render('404');
    } else {
        res.render('frameworks/details', {framework: framework});
    }
});

module.exports = router;
