const assessmentsDao = require("./dao/assessmentsDao");
const jobRolesDao = require("./dao/jobRolesDao");
const usersDao = require("./dao/usersDao");

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
            res.redirect('assessments/' + assessment.id);
            return;
        }

        console.log(req.body);
        
    });

}

module.exports = {
    setupRoutes: setupRoutes
}