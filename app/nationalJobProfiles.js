const nationalJobProfilesDao = require('./dao/nationalJobProfilesDao');

const setupRoutes = (router) => {
    router.get('/national-job-profiles/:id', async (req, res) => {
        const nationalJobProfile = await nationalJobProfilesDao.getFromId(req.params.id);
        res.render('nationalJobProfiles/show', { nationalJobProfile: nationalJobProfile })
    });
};

module.exports = {
    setupRoutes: setupRoutes
}