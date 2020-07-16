const jobRolesDao = require('./dao/jobRolesDao');
const nationalJobProfilesDao = require('./dao/nationalJobProfilesDao');
const competenciesDao = require('./dao/competenciesDao');
const usersDao = require('./dao/usersDao');

const setupRoutes = (router) => {

    router.get('/job-roles/new', (req, res) => {
        res.render('jobRoles/new/name');
    });

    router.post('/job-roles/new/profile-category', async (req, res) => {
        const categories = await nationalJobProfilesDao.getCategories();
        res.render('jobRoles/new/profile-category', { name: req.body.name, categories: categories });
    });

    router.post('/job-roles/new/profile', async (req, res) => {
        if (req.body.profileCategory === '0') {
            // "Skip for now"
            res.render('jobRoles/new/description', { name: req.body.name });
        } else {
            const profiles = await nationalJobProfilesDao.getProfilesForCategory(req.body.profileCategory);
            res.render('jobRoles/new/profile', { name: req.body.name, profiles: profiles });    
        }
    });

    router.post('/job-roles/new/description', async (req, res) => {
        const profileName = req.body.profileId && (await nationalJobProfilesDao.getFromId(req.body.profileId)).name;
        res.render('jobRoles/new/description', { name: req.body.name, profileId: req.body.profileId, profileName: profileName });
    });

    router.post('/job-roles/new/competencies', async (req, res) => {
        const profileName = req.body.profileId && (await nationalJobProfilesDao.getFromId(req.body.profileId)).name;
        const competencies = await competenciesDao.getAll();
        res.render('jobRoles/new/competencies', {
            name: req.body.name,
            profileId: req.body.profileId,
            profileName: profileName,
            description: req.body.description,
            competencies: competencies.slice(0, 5)
        });
    });

    router.post('/job-roles/new/confirm', async (req, res) => {
        const profileName = req.body.profileId && (await nationalJobProfilesDao.getFromId(req.body.profileId)).name;
        res.render('jobRoles/new/confirm', {
            name: req.body.name,
            profileId: req.body.profileId,
            profileName: profileName,
            description: req.body.description,
            competencies: req.body.competencies,
            competencyNames: req.body.competencyNames
        });
    });

    router.post('/job-roles/new', async (req, res) => {
        const result = await jobRolesDao.create(req.body.name, req.body.description, req.body.profileId);
        if (result) {
            for (let i = 0; i < req.body.competencies.length; i++) {
                const competencyId = req.body.competencies[i];
                await jobRolesDao.addRequirementToRole(result, competencyId);                
            }
            res.redirect('/job-roles/' + result);
        } else {
            res.render('/job-roles/new/name', {error: 'An error was encountered. Please try again'});
        }
    });

    router.get('/job-roles', async (req, res) => {
        const jobRoles = await jobRolesDao.getAll();
        const admin = req.cookies.heeUserId && (await usersDao.getPrimaryRole(req.cookies.heeUserId)) === 'Manager';
        res.render('jobRoles/list', { jobRoles: jobRoles, admin: admin });
    });

    router.get('/job-roles/:id', async (req, res, next) => {
        const jobRole = await jobRolesDao.getJobRole(req.params.id);
        if (!jobRole) {
            next();
        } else {
            const nationalJobProfile = await nationalJobProfilesDao.getFromId(jobRole.national_job_profile_id);
            res.render('jobRoles/show', { jobRole: jobRole, nationalJobProfile: nationalJobProfile })
        }
    });

};

module.exports = {
    setupRoutes: setupRoutes
}