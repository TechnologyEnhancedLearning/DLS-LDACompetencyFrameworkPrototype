const pool = require('./pool.js');
const sampleData = require('./sample-data');

const getAll = async () => {
    console.log("Getting all frameworks");
    const { rows } = await pool.query(
        `SELECT f.title AS title, f.slug AS slug, u.name AS name, STRING_AGG (
            wgu.name, ','
        ) AS working_group
        FROM frameworks f
        JOIN users u ON f.owner_id = u.id
        RIGHT JOIN working_groups_links wg ON f.id = wg.framework_id
        INNER JOIN users wgu ON wgu.id = wg.user_id
        WHERE f.id = 1
        GROUP BY f.id, u.id;`);
    console.log(rows);
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