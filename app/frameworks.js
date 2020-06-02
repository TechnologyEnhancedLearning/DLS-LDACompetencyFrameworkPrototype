const pool = require('./pool.js');
const sampleData = require('./sample-data');

const getAll = async () => {
    const { rows } = await pool.query(
        `SELECT f.title AS title, f.slug AS slug, u.name AS owner, working_group as working_group
        FROM frameworks f
        JOIN users u ON u.id = f.owner_id
        LEFT JOIN (
            SELECT wg.framework_id AS framework_id, STRING_AGG(wgu.name, ',') AS working_group
            FROM working_groups_links wg
            JOIN users wgu ON wgu.id = wg.user_id
            GROUP BY wg.framework_id
        ) wg_info ON wg_info.framework_id = f.id;`);
    return rows;
};

const getFromSlug = async (slug) => {
    const { rows } = await pool.query('SELECT * from frameworks WHERE slug = $1', [ slug ]);
    return !!rows && rows[0];
}

const setupRoutes = (router) => {
    router.post('/frameworks', (req, res) => {
        res.redirect('/frameworks/working-group');
    });

    router.get('/frameworks/:slug', async (req, res, next) => {
        const framework = await getFromSlug(req.params.slug);
        if (!framework) {
            next();
        } else {
            res.redirect('/frameworks/' + req.params.slug + '/details');
        }
    });

    router.get('/frameworks/:slug/details', async (req, res, next) => {
        const framework = await getFromSlug(req.params.slug);
        if (!framework) {
            next();
        } else {
            res.render('frameworks/details', {framework: framework});
        }
    });

    router.get('/frameworks/:slug/structure', async (req, res, next) => {
        const framework = await getFromSlug(req.params.slug);
        if (!framework) {
            next();
        } else {
            res.render('frameworks/structure', {framework: framework});
        }
    });

    router.get('/frameworks/:slug/comments', async (req, res, next) => {
        const framework = await getFromSlug(req.params.slug);
        if (!framework) {
            next();
        } else {
            res.render('frameworks/comments', {framework: framework});
        }
    });

    router.get('/frameworks/:slug/options', async (req, res, next) => {
        const framework = await getFromSlug(req.params.slug);
        if (!framework) {
            next();
        } else {
            res.render('frameworks/options', {framework: framework});
        }
    });
}

module.exports = {
    getAll: getAll,
    setupRoutes: setupRoutes
}