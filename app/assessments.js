const assessmentsDao = require('./dao/assessmentsDao');
const jobRolesDao = require('./dao/jobRolesDao');
const usersDao = require('./dao/usersDao');

const setupRoutes = (router) => {
    router.get('/assessments/new', async (req, res) => {
        const users = await usersDao.getLearners();
        res.render('assessments/new/user.html', {
            users: users.map(user => {
                return {
                    value: user.id,
                    text: user.name
                }
            })
        });
    });

    router.get('/users/:id/assessments/new', async (req, res, next) => {
        const user = await usersDao.get(req.params.id);
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

    router.get('/job-roles/:id/assessments/new', async (req, res, next) => {
        const jobRole = await jobRolesDao.getJobRole(req.params.id);
        if (!jobRole) {
            next();
            return;
        }

        const users = await usersDao.getLearners();
        res.render('assessments/new/user.html', {
            users: users.map(user => {
                return {
                    value: user.id,
                    text: user.name
                }
            }),
            jobRole: jobRole
        });
    });

    router.post('/assessments/new/job-role', async (req, res, next) => {
        const user = req.body.userId && await usersDao.get(req.body.userId);
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