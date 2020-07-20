const jobRolesDao = require("./dao/jobRolesDao");

const setupRoutes = (router) => {

    router.get('/job-roles/:id/clone', async (req, res, next) => {
        const jobRole = await jobRolesDao.getJobRole(req.params.id);
        if (!jobRole) {
            next();
            return;
        }

        res.render('clones/new', { jobRole: jobRole })
    });

}

module.exports = {
    setupRoutes: setupRoutes
}
