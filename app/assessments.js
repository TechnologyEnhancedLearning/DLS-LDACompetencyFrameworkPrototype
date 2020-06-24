const assessmentsDao = require('./dao/assessmentsDao');
const jobRolesDao = require('./dao/jobRolesDao');

const setupRoutes = (router) => {
    router.get('/assessments/new', (req, res) => {
        res.render('assessments/new/user.html');
    });

    router.get('/users/:id/assessments/new', (req, res) => {
        // TODO implement and autopopulate user ID
    });

    router.get('/job-roles/:id/assessments/new', (req, res) => {
        // TODO implement and autopopulate job ID
    });

    router.post('/assessments/new/job-role', async (req, res, next) => {
        const user = { name: "Sarah Binney", id: 1 }; // usersDao.get(req.body.userId);
        if (!user) {
            next();
        } else {
            const jobRoles = await jobRolesDao.getAll();
            const jobs = jobRoles.map((job) => {
                return {
                    value: job.id,
                    text: job.name
                }
            });
            res.render('assessments/new/jobRole', { user: user, jobs: jobs });
        }
    });

    router.post('/assessments/new', async (req, res) => {
        const assessmentId = await assessmentsDao.create(req.body.userId, req.body.jobRoleId);
        res.redirect('/assessments/' + assessmentId);
    });

    router.get('/assessments/:id', async (req, res, next) => {
        const assessment = await assessmentsDao.get(req.params.id);
        if (!assessment) {
            next();
        } else {
            // TODO append user, job role, competencies, and assessmentComponents
            res.render('assessments/show', { assessment: assessment });
        }
    });

}

module.exports = {
    setupRoutes: setupRoutes
}