const jobRolesDao = require('./dao/jobRolesDao');
const nationalJobProfilesDao = require('./dao/nationalJobProfilesDao');

const setupRoutes = (router) => {

    router.get('/job-roles/new', (req, res) => {
        res.render('jobRoles/new/name');
    });

    router.post('/job-roles/new/profile', (req, res) => {
        res.render('jobRoles/new/profile', { name: req.body.name });
    });

    router.post('/job-roles/new/description', (req, res) => {
        res.render('jobRoles/new/description', { name: req.body.name, profileId: req.body.profileId });
    });

    router.post('/job-roles/new', async (req, res) => {
        const result = await jobRolesDao.create(req.body.name, req.body.description, req.body.profileId);
        if (result) {
            res.redirect('/job-roles/' + result.id);
        } else {
            res.render('/job-roles/new/name', {error: 'An error was encountered. Please try again'});
        }
    });

    router.get('/job-roles', async (req, res) => {
        const jobRoles = await jobRolesDao.getAll();
        res.render('jobRoles/list', { jobRoles: jobRoles });
    });

    router.get('/job-roles/:id', async (req, res, next) => {
        const jobRole = await jobRolesDao.getJobRole(req.params.id);
        if (!jobRole) {
            next();
        } else {
            const nationalJobProfile = nationalJobProfilesDao.getFromId(jobRole.national_job_profile_id);
            res.render('jobRoles/show', { jobRole: jobRole, nationalJobProfile: nationalJobProfile })
        }
    });

};

module.exports = {
    setupRoutes: setupRoutes
}