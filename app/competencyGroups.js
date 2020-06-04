const frameworksDao = require('./dao/frameworksDao.js');
const competencyGroupsDao = require('./dao/competencyGroupsDao.js');

const setupRoutes = (router) => {
    router.get('/competency-groups/:id', async (req, res, next) => {
        const frameworkSlug = await competencyGroupsDao.getAFrameworkForCompetencyGroup(req.params.id);
        if (!frameworkSlug) {
            next();
        } else {
            res.redirect('/frameworks/' + frameworkSlug + '/structure');
        }
    });

    router.get('/frameworks/:slug/competency-groups/new', async (req, res, next) => {
        const framework = await frameworksDao.getFromSlug(req.params.slug);
        if (!framework) {
            next();
        } else {
            res.render('competencyGroups/new', { framework: framework });
        }
    })

    router.post('/frameworks/:slug/competency-groups', async (req, res, next) => {
        const framework = await frameworksDao.getFromSlug(req.params.slug);
        if (!framework) {
            next();
            return;
        }

        const competencyGroupId = await competencyGroupsDao.addCompetencyGroup(req.body.name, req.body.description);
        await competencyGroupsDao.addCompetencyGroupToFramework(competencyGroupId, framework.id);
        res.redirect('/frameworks/' + framework.slug + '/structure');
    });
}

module.exports = {
    setupRoutes: setupRoutes
}