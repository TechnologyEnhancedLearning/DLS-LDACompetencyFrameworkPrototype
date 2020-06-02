const express = require('express');
const router = express.Router();
const frameworks = require('./frameworks.js');

router.get('/', (req, res) => {
    res.render('index', {frameworks: frameworks.getAll()})
});

router.get('/dashboard', (req, res) => {
    res.render('index', {frameworks: frameworks.getAll()})
});

router.get('/connect', async (req, res) => {
    await frameworks.connectToDb();
    res.send("Done!");
})

router.post('/frameworks', (req, res) => {
    console.log(req.body);
    res.redirect('/frameworks/working-group');
});

router.get('/frameworks/:slug', (req, res, next) => {
    const framework = frameworks.getAll().filter(f => f.slug === req.params.slug)[0];
    if (!framework) {
        next();
    } else {
        res.render('frameworks/details', {framework: framework});
    }
});

module.exports = router;
