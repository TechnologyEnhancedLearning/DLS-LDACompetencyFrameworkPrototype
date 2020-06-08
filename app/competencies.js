const competencyGroupsDao = require('./dao/competencyGroupsDao.js');
const competenciesDao = require('./dao/competenciesDao.js');
const skillLevelsDao = require('./dao/skillLevelsDao');

const capitalise = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const setupRoutes = (router) => {
    router.get('/competencies/:id', async (req, res, next) => {
        const competency = await competenciesDao.getCompetency(req.params.id);
        if (!competency) {
            next();
        } else {
            competency.skillLevels = await skillLevelsDao.getForCompetency(competency.id);
            res.render('competencies/show', { competency: competency });
        }
    });

    router.get('/competency-groups/:id/competencies/new', async (req, res, next) => {
        const competencyGroup = await competencyGroupsDao.getCompetencyGroup(req.params.id);
        if (!competencyGroup) {
            next();
        } else {
            res.render('competencies/new', { competencyGroup: competencyGroup });
        }
    })

    router.post('/competency-groups/:id/competencies', async (req, res, next) => {
        const competencyGroup = await competencyGroupsDao.getCompetencyGroup(req.params.id);
        if (!competencyGroup) {
            next();
            return;
        }

        const competencyId = await competenciesDao.addCompetency(competencyGroup.id, req.body);
        const skillLevelNames = req.body.skillsTemplate && req.body.skillsTemplate.split("-").map(capitalise);
        await skillLevelsDao.addTemplateSkillLevels(competencyId, skillLevelNames);
        res.redirect('/competencies/' + competencyId);
    });
}

module.exports = {
    setupRoutes: setupRoutes
}