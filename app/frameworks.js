const pool = require('./pool.js');

const getAll = async () => {
    try {
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
    } catch (e) {
        console.error(e);
        return [];
    }
};

const getFromSlug = async (slug) => {
    try {
        const { rows } = await pool.query(
            `SELECT f.id, f.title, f.slug, u.name AS owner, working_group as working_group
        FROM frameworks f
        JOIN users u ON u.id = f.owner_id
        LEFT JOIN (
            SELECT wg.framework_id AS framework_id, STRING_AGG(wgu.name, ',') AS working_group
            FROM working_groups_links wg
            JOIN users wgu ON wgu.id = wg.user_id
            GROUP BY wg.framework_id
        ) wg_info ON wg_info.framework_id = f.id
        WHERE f.slug = $1;`, [slug]);
        return !!rows && rows[0];
    } catch (e) {
        console.error(e);
        return null;
    }
}

const getCompetenciesForFramework = async (frameworkId) => {
    try {
        const { rows } = await pool.query(
            `SELECT c.name, c.description, cf.ordering
            FROM competencies_frameworks cf
            JOIN competencies c ON c.id = cf.competency_id
            WHERE cf.framework_id = $1
            ORDER BY cf.ordering;`, [frameworkId]
        );
        return !!rows && rows;
    } catch (e) {
        console.log(e);
        return null;
    }
}

const setupRoutes = (router) => {
    router.post('/frameworks', async (req, res) => {
        const title = req.body.title;
        const slug = title.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase().substring(0, 30);
        const currentUser = 1;
        try {
            await pool.query(`INSERT INTO frameworks (title, slug, owner_id) VALUES ($1, $2, $3) RETURNING id;`, [title, slug, currentUser]);
            res.redirect('/frameworks/' + slug + '/working-group');
        } catch (e) {
            res.render('frameworks/new', { error: "An error was encountered: Please try a different name." });
        }
    });

    router.get('/frameworks/:slug', async (req, res, next) => {
        const framework = await getFromSlug(req.params.slug);
        if (!framework) {
            next();
        } else {
            res.redirect('/frameworks/' + req.params.slug + '/details');
        }
    });

    router.get('/frameworks/:slug/working-group', async (req, res) => {
        const framework = await getFromSlug(req.params.slug);
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
        const framework = await getFromSlug(req.params.slug);
        if (!framework) {
            next();
        } else {
            res.render('frameworks/details', { framework: framework });
        }
    });

    router.get('/frameworks/:slug/structure', async (req, res, next) => {
        const framework = await getFromSlug(req.params.slug);
        if (!framework) {
            next();
        } else {
            framework.competencies = await getCompetenciesForFramework(framework.id);
            res.render('frameworks/structure', { framework: framework });
        }
    });

    router.get('/frameworks/:slug/comments', async (req, res, next) => {
        const framework = await getFromSlug(req.params.slug);
        if (!framework) {
            next();
        } else {
            res.render('frameworks/comments', { framework: framework });
        }
    });

    router.get('/frameworks/:slug/options', async (req, res, next) => {
        const framework = await getFromSlug(req.params.slug);
        if (!framework) {
            next();
        } else {
            res.render('frameworks/options', { framework: framework });
        }
    });
}

module.exports = {
    getFromSlug: getFromSlug,
    getAll: getAll,
    setupRoutes: setupRoutes
}