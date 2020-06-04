const competencyGroupsDao = require('./dao/competencyGroupsDao.js');
const competenciesDao = require('./dao/competenciesDao.js');

const setupRoutes = (router) => {
    router.get('/competencies/:id', async (req, res, next) => {
        const competency = await competenciesDao.getCompetency(req.params.id);
        if (!competency) {
            next();
        } else {
            res.render('competencies/show', { competency: competency });
        }
    });

    router.get('/competency-groups/:id/competencies/new', async (req, res, next) => {
        console.log("You're trying to add a new thing");
        const competencyGroup = await competencyGroupsDao.getCompetencyGroup(req.params.id);
        if (!competencyGroup) {
            next();
        } else {
            res.render('competencies/new', { competencyGroup: competencyGroup });
        }
    })

    router.post('/competency-groups/:id/competencies', async (req, res, next) => {
        console.log("You're trying to add a thing");
        const competencyGroup = await competencyGroupsDao.getCompetencyGroup(req.params.id);
        if (!competencyGroup) {
            next();
            return;
        }

        const competencyId = await competenciesDao.addCompetency(competencyGroup.id, req.body);
        res.redirect('/competencies/' + competencyId);
    });
}

module.exports = {
    setupRoutes: setupRoutes
}