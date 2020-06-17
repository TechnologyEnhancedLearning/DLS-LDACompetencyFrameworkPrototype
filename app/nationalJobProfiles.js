const nationalJobProfilesDao = require('./dao/nationalJobProfilesDao');

const setupRoutes = (router) => {
    router.get('/national-job-profiles/:id', (req, res) => {
        const nationalJobProfile = nationalJobProfilesDao.getFromId(req.params.id);
        res.render('nationalJobProfiles/show', { nationalJobProfile: nationalJobProfile })
    });
};

module.exports = {
    setupRoutes: setupRoutes
}