const express = require('express');
const router = express.Router();
const frameworksDao = require('./dao/frameworksDao');
const frameworks = require('./frameworks.js');
const competencyGroups = require('./competencyGroups.js');
const competencies = require('./competencies.js');
const jobRoles = require('./jobRoles');
const nationalJobProfiles = require('./nationalJobProfiles');

router.get('/', async (req, res) => {
    res.redirect('dashboard');
});

router.get('/dashboard', async (req, res) => {
    res.render('dashboard', {frameworks: await frameworksDao.getAll()})
});

frameworks.setupRoutes(router);
competencyGroups.setupRoutes(router);
competencies.setupRoutes(router);
jobRoles.setupRoutes(router);
nationalJobProfiles.setupRoutes(router);

module.exports = router;
