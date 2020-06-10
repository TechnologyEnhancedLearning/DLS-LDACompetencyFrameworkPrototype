const jobRolesDao = require('./dao/jobRolesDao');

const setupRoutes = (router) => {
    router.get('/job-roles', async (req, res) => {
        const jobRoles = await jobRolesDao.getAll();
        res.render('jobRoles/list', { jobRoles: jobRoles });
    });

    router.get('/job-roles/:id', async (req, res, next) => {
        const jobRole = await jobRolesDao.getJobRole(req.params.id);
        if (!jobRole) {
            next();
        } else {
            res.render('jobRoles/show', { jobRole: jobRole })
        }
    });
};

module.exports = {
    setupRoutes: setupRoutes
}