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

frameworks.setupRoutes(router);

module.exports = router;
