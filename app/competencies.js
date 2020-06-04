const pool = require('./pool.js');
const frameworks = require('./frameworks.js');

const addCompetency = async (name, description) => {
    try {
        const { rows } = await pool.query(
            `INSERT INTO competencies (name, description) VALUES ($1, $2) RETURNING id;`, [name, description]
        );
        return rows[0].id;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

const addCompetencyToFramework = async (competencyId, frameworkId) => {
    try {
        await pool.query(
            `INSERT INTO competencies_frameworks (competency_id, framework_id, ordering)
            SELECT $1, $2, MAX(ordering) + 1
                FROM competencies_frameworks
                WHERE framework_id = $2;`, [competencyId, frameworkId]
        );
    } catch (e) {
        console.log(e);
        throw e;
    }
}

const setupRoutes = (router) => {
    router.get('/frameworks/:slug/competencies/new', async (req, res, next) => {
        const framework = await frameworks.getFromSlug(req.params.slug);
        if (!framework) {
            next();
        } else {
            res.render('competencies/new', { framework: framework });
        }
    })

    router.post('/frameworks/:slug/competencies', async (req, res, next) => {
        const framework = await frameworks.getFromSlug(req.params.slug);
        if (!framework) {
            next();
            return;
        }

        const competencyId = await addCompetency(req.body.name, req.body.description);
        await addCompetencyToFramework(competencyId, framework.id);
        res.redirect('/frameworks/' + framework.slug + '/structure');
    });
}

module.exports = {
    setupRoutes: setupRoutes
}