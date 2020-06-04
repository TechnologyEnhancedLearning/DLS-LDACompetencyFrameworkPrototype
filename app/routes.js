const express = require('express');
const router = express.Router();
const frameworks = require('./frameworks.js');
const competencies = require('./competencies.js');

router.get('/', async (req, res) => {
    res.redirect('dashboard');
});

router.get('/dashboard', async (req, res) => {
    res.render('dashboard', {frameworks: await frameworks.getAll()})
});

frameworks.setupRoutes(router);
competencies.setupRoutes(router);

module.exports = router;
