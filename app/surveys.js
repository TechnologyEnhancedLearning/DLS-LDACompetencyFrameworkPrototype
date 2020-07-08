const assessmentsDao = require("./dao/assessmentsDao");
const jobRolesDao = require("./dao/jobRolesDao");
const usersDao = require("./dao/usersDao");
const surveysDao = require("./dao/surveysDao");

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

    router.get('/assessments/:id/survey', async (req, res, next) => {
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
        res.render('assessments/learner/survey', {
            assessment: assessment,
            jobRole: jobRole
        });
    });

    router.post('/assessments/:id/survey', async (req, res, next) => {
        const assessment = await assessmentsDao.get(req.params.id);
        if (!assessment) {
            next();
            return;
        } else if (assessment.result) {
            res.redirect('/assessments/' + assessment.id);
            return;
        }

        for (let i = 0; i < req.body.competencies.length; i++) {
            const competencyId = req.body.competencies[i];
            const survey = {
                assessmentId: assessment.id,
                competencyId: competencyId,
                confidence: req.body.confidence["c" + competencyId],
                relevance: req.body.relevance["r" + competencyId]
            };
            await surveysDao.addSurveyResult(survey);
        }
        res.render('assessments/learner/thanks', {
            assessment: assessment
        });
    });

}

module.exports = {
    setupRoutes: setupRoutes
}