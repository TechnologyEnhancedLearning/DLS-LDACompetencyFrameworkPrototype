const assessmentsDao = require("./dao/assessmentsDao");
const jobRolesDao = require("./dao/jobRolesDao");
const usersDao = require("./dao/usersDao");
const selfAppraisalsDao = require("./dao/selfAppraisalsDao");
const competenciesDao = require("./dao/competenciesDao");

const setupRoutes = (router) => {
    
    router.get('/assessments/:id/email', async (req, res) => {
        const assessment = await assessmentsDao.get(req.params.id);
        if (!assessment) {
            next();
            return;
        } else if (assessment.result) {
            res.redirect('assessments/' + assessment.id);
            return;
        }

        const user = await usersDao.get(assessment.user_id);
        const jobRole = await jobRolesDao.getJobRole(assessment.job_role_id);
        assessment.components = await assessmentsDao.getComponentsFor(assessment.id);
        assessment.complete = !assessment.components.some(component => !component.existing_assessment);

        res.render('assessments/learner/email', {
            assessment: assessment,
            user: user,
            jobRole: jobRole,
            today: new Date()
        })
    });

    router.get('/assessments/:id/self-appraisal', async (req, res, next) => {
        const assessment = await assessmentsDao.get(req.params.id);
        if (!assessment) {
            next();
            return;
        } else if (assessment.result) {
            res.redirect('assessments/' + assessment.id);
            return;
        }

        assessment.components = await assessmentsDao.getComponentsFor(assessment.id);
        const jobRole = await jobRolesDao.getJobRole(assessment.job_role_id);
        res.render('assessments/learner/selfAppraisal', {
            assessment: assessment,
            jobRole: jobRole
        });
    });

    router.get('/assessments/:id/self-appraisal/:competency_id', async (req, res, next) => {
        const assessment = await assessmentsDao.get(req.params.id);
        if (!assessment) {
            next();
            return;
        } else if (assessment.result) {
            res.redirect('assessments/' + assessment.id);
            return;
        }

        const competency = await competenciesDao.getCompetency(req.params.competency_id);
        const jobRole = await jobRolesDao.getJobRole(assessment.job_role_id);
        res.render('assessments/learner/selfAppraisalQuestion', {
            assessment: assessment,
            jobRole: jobRole,
            competency: competency
        })

    });

    router.post('/assessments/:id/self-appraisal/:competency_id', async (req, res, next) => {
        const competencyId = req.params.competency_id;
        const assessment = await assessmentsDao.get(req.params.id);
        if (!assessment) {
            next();
            return;
        } else if (assessment.result) {
            res.redirect('/assessments/' + assessment.id);
            return;
        }

        await selfAppraisalsDao.addResult({
            assessmentId: assessment.id,
            competencyId: competencyId,
            confidence: req.body.confidence,
            relevance: req.body.relevance
        });

        const results = await jobRolesDao.getJobRole(assessment.job_role_id);
        const nextCompetency = results.requirements.sort((a, b) => a.competency_id > b.competency_id ? 1 : -1)
                                      .filter(a => a.competency_id > competencyId)
                                      .shift();
        if (nextCompetency) {
            res.redirect('/assessments/' + assessment.id + '/self-appraisal/' + nextCompetency.competency_id);
        } else {
            res.redirect('/assessments/' + assessment.id + '/thanks/');
        }

    });

    router.get('/assessments/:id/thanks', async (req, res, next) => {
        const assessment = await assessmentsDao.get(req.params.id);
        if (!assessment) {
            next();
            return;
        }

        const jobRole = await jobRolesDao.getJobRole(assessment.job_role_id);
        res.render('assessments/learner/thanks', {
            assessment: assessment,
            jobRole: jobRole
        });
    });
}

module.exports = {
    setupRoutes: setupRoutes
}