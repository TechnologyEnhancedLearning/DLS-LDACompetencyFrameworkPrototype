const competencyGroupsDao = require('./dao/competencyGroupsDao');
const competenciesDao = require('./dao/competenciesDao');
const duplicationDao = require('./dao/duplicationDao');
const criteriaDao = require('./dao/criteriaDao');
const linkedNationalStandardsDao = require('./dao/linkedNationalStandardsDao');
const frameworksDao = require('./dao/frameworksDao');

const capitalise = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const setupRoutes = (router) => {
    router.get('/competencies/:id', async (req, res, next) => {
        const competency = await competenciesDao.getCompetency(req.params.id);
        if (!competency) {
            next();
        } else {
            competency.duplications = await duplicationDao.getForCompetency(competency);
            const { knowledgeAndUnderstanding, abilities } = await criteriaDao.getForCompetency(competency.id);
            competency.knowledgeAndUnderstanding = knowledgeAndUnderstanding;
            competency.abilities = abilities;
            competency.linkedStandards = await linkedNationalStandardsDao.getForCompetency(competency.id);
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
    });

    router.post('/competency-groups/:id/competencies', async (req, res, next) => {
        const competencyGroup = await competencyGroupsDao.getCompetencyGroup(req.params.id);
        if (!competencyGroup) {
            next();
            return;
        }

        const competencyId = await competenciesDao.addCompetencyToGroup(competencyGroup.id, req.body);
        res.redirect('/competencies/' + competencyId);
    });


    router.get('/frameworks/:slug/competencies/new', async (req, res, next) => {
        const framework = await frameworksDao.getFromSlug(req.params.slug);
        if (!framework) {
            next();
        } else {
            res.render('competencies/new', { framework: framework });
        }
    });

    router.post('/frameworks/:slug/competencies', async (req, res, next) => {
        const framework = await frameworksDao.getFromSlug(req.params.slug);
        if (!framework) {
            next();
            return;
        }

        const competencyId = await competenciesDao.addCompetencyToFramework(framework.id, req.body);
        res.redirect('/competencies/' + competencyId);
    });

}

module.exports = {
    setupRoutes: setupRoutes
}