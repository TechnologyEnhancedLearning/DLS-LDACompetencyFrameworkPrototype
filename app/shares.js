const jobRolesDao = require("./dao/jobRolesDao");
const usersDao = require("./dao/usersDao");
const sharesDao = require("./dao/sharesDao");

const setupRoutes = (router) => {

    router.get('/job-roles/:id/share', async (req, res, next) => {
        const jobRole = await jobRolesDao.getJobRole(req.params.id);
        if (!jobRole) {
            next();
            return;
        }

        const users = await usersDao.getAll();
        res.render('shares/new', { jobRole: jobRole,
            users: users.map(user => {
                return {
                    value: user.id,
                    text: user.name
                }
            })
        })
    });

    router.post('/job-roles/:id/share', async (req, res, next) => {
        const id = await sharesDao.create({ jobRoleId: req.params.id, recipientId: req.body.userId });
        res.redirect('/job-roles/' + req.params.id);
    });

}

module.exports = {
    setupRoutes: setupRoutes
}
