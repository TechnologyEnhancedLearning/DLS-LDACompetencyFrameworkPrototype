const assessmentsDao = require("./dao/assessmentsDao");
const jobRolesDao = require("./dao/jobRolesDao");
const usersDao = require("./dao/usersDao");
const evidenceDao = require("./dao/evidenceDao");

const setupRoutes = (router) => {

    router.get('/assessments/:id/evidence', async (req, res, next) => {
        const assessment = await assessmentsDao.get(req.params.id);
        if (!assessment) {
            next();
            return;
        }

        const user = await usersDao.get(assessment.user_id);
        assessment.components = await assessmentsDao.getComponentsFor(assessment.id);
        assessment.evidence = await evidenceDao.getForAssessment(assessment.id);
        assessment.evidenceFor = [...new Set(assessment.evidence.reduce((a, evidence) => a.concat(evidence.competencies), []))];
        const jobRole = await jobRolesDao.getJobRole(assessment.job_role_id);

        if (req.cookies.heeUserId == assessment.user_id) {
            res.render('assessments/evidence/list', {
                assessment: assessment,
                jobRole: jobRole,
                user: user
            });
        } else {
            // TODO render a separate "manager" page for manager upload of evidence
            res.render('assessments/evidence/list', {
                assessment: assessment,
                jobRole: jobRole,
                user: user
            });
        }
    });

    router.get('/assessments/:id/evidence/new', async (req, res, next) => {
        const assessment = await assessmentsDao.get(req.params.id);
        if (!assessment) {
            next();
            return;
        }

        const jobRole = await jobRolesDao.getJobRole(assessment.job_role_id);
        res.render('assessments/evidence/new', { assessment: assessment, jobRole: jobRole });
    });

    router.post('/assessments/:id/evidence', async (req, res, next) => {
        const assessment = await assessmentsDao.get(req.params.id);
        if (!assessment) {
            next();
            return;
        }

        await evidenceDao.add({
            assessmentId: req.params.id,
            body: req.body.evidenceFile,
            competencyIds: req.body.competencyIds.join(','),
            userId: req.cookies.heeUserId
        });
        res.redirect('/assessments/' + req.params.id + '/evidence');
    });
}

module.exports = {
    setupRoutes: setupRoutes
};