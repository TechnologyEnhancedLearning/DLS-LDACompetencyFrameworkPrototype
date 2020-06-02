const express = require('express');
const router = express.Router();
const frameworks = require('./frameworks.js');

router.get('/', async (req, res) => {
    res.redirect('dashboard');
});

router.get('/dashboard', async (req, res) => {
    res.render('dashboard', {frameworks: await frameworks.getAll()})
});

frameworks.setupRoutes(router);

module.exports = router;
