// External dependencies
const express = require('express');
const router = express.Router();
const frameworks = require('./frameworks.js');

router.get('/dashboard', (req, res) => {
    res.render('dashboard', {frameworks: frameworks.getAll()})
});

router.get('/connect', async (req, res) => {
    await frameworks.connectToDb();
    res.send("Done!");
})

router.post('/frameworks', (req, res) => {
    console.log(req.body);
    res.redirect('/frameworks/working-group');
});

router.get('/frameworks/new', (req, res) => {
    res.render('frameworks/new');
}).get('/frameworks/working-group', (req, res) => {
    res.render('frameworks/working-group');
})

router.get('/frameworks/:slug', (req, res) => {
    const framework = frameworks.getAll().filter(f => f.slug === req.params.slug)[0];
    if (!framework) {
        res.render('404');
    } else {
        res.render('frameworks/details', {framework: framework});
    }
});

module.exports = router;
