const competenciesDao = require('./dao/competenciesDao');
const skillLevelsDao = require('./dao/skillLevelsDao');

const setupRoutes = (router) => {
    router.get('/competencies/:id/skill-levels/:ordering', async (req, res, next) => {
        const skillLevel = await skillLevelsDao.getSkillLevel(req.params.id, req.params.ordering);
        if (!skillLevel) {
            next();
        } else {
            res.render('skillLevels/show', {skillLevel: skillLevel});
        }
    });

    router.get('/competencies/:id/skill-levels/:ordering/edit', async (req, res, next) => {
        const skillLevel = await skillLevelsDao.getSkillLevel(req.params.id, req.params.ordering);
        if (!skillLevel) {
            next();
        } else {
            res.render('skillLevels/edit', {skillLevel: skillLevel});
        }
    });

    router.post('/competencies/:id/skill-levels/:ordering', async (req, res, next) => {
        const result = await skillLevelsDao.updateSkillLevel(req.params.id, req.params.ordering, req.body);
        if (!result) {
            next();
        } else {
            res.redirect('/competencies/' + req.params.id);
        }
    });

    router.get('/skill-levels/:id', async (req, res, next) => {
        const result = await skillLevelsDao.getSkillLevelFromId(req.params.id);
        if (!result) {
            next();
        } else {
            res.redirect('/competencies/' + result.competency_id + "/skill-levels/" + result.ordering);
        }
    })
};


module.exports = {
    setupRoutes: setupRoutes
}