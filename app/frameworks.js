const frameworksDao = require('./dao/frameworksDao.js');
const competencyGroupsDao = require('./dao/competencyGroupsDao.js');

const setupRoutes = (router) => {
    router.post('/frameworks', async (req, res) => {
        const title = req.body.title;
        const slug = title.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase().substring(0, 30);
        const currentUser = 1;
        try {
            await frameworksDao.addFramework(title, slug, currentUser);
            res.redirect('/frameworks/' + slug + '/working-group');
        } catch (e) {
            res.render('frameworks/new', { error: "An error was encountered: Please try a different name." });
        }
    });

    router.get('/frameworks/:slug', async (req, res, next) => {
        const framework = await frameworksDao.getFromSlug(req.params.slug);
        if (!framework) {
            next();
        } else {
            res.redirect('/frameworks/' + req.params.slug + '/details');
        }
    });

    router.get('/frameworks/:slug/working-group', async (req, res) => {
        const framework = await frameworksDao.getFromSlug(req.params.slug);
        if (!framework) {
            next();
        } else {
            res.render('frameworks/working-group', { framework: framework });
        }
    });

    router.post('/frameworks/:slug/working-group', (req, res) => {
        console.log("You posted a new working group to " + req.params.slug);
        console.log(req.body);
        res.redirect('/frameworks/' + req.params.slug);
    });

    router.get('/frameworks/:slug/details', async (req, res, next) => {
        const framework = await frameworksDao.getFromSlug(req.params.slug);
        if (!framework) {
            next();
        } else {
            res.render('frameworks/details', { framework: framework });
        }
    });

    router.get('/frameworks/:slug/structure', async (req, res, next) => {
        const framework = await frameworksDao.getFromSlug(req.params.slug);
        if (!framework) {
            next();
        } else {
            framework.competencyGroups = await competencyGroupsDao.getCompetencyGroupsForFramework(framework.id);
            res.render('frameworks/structure', { framework: framework });
        }
    });

    router.get('/frameworks/:slug/comments', async (req, res, next) => {
        const framework = await frameworksDao.getFromSlug(req.params.slug);
        if (!framework) {
            next();
        } else {
            res.render('frameworks/comments', { framework: framework });
        }
    });

    router.get('/frameworks/:slug/options', async (req, res, next) => {
        const framework = await frameworksDao.getFromSlug(req.params.slug);
        if (!framework) {
            next();
        } else {
            res.render('frameworks/options', { framework: framework });
        }
    });
}

module.exports = {
    setupRoutes: setupRoutes
}