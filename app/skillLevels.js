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
};


module.exports = {
    setupRoutes: setupRoutes
}