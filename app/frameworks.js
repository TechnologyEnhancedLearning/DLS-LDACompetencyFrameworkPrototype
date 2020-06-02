const pool = require('./pool.js');
const sampleData = require('./sample-data');

const connectToDb = async () => {
    const client = await pool.get().connect();

    client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            console.log(JSON.stringify(row));
        }
        client.end();
    });
}

const getAll = () => {
    // qq pull from db
    return sampleData.frameworks;
};

const setupRoutes = (router) => {
    router.post('/frameworks', (req, res) => {
        res.redirect('/frameworks/working-group');
    });

    router.get('/frameworks/:slug', (req, res, next) => {
        const framework = getAll().filter(f => f.slug === req.params.slug)[0];
        if (!framework) {
            next();
        } else {
            res.redirect('/frameworks/' + req.params.slug + '/details');
        }
    });

    router.get('/frameworks/:slug/details', (req, res, next) => {
        const framework = getAll().filter(f => f.slug === req.params.slug)[0];
        if (!framework) {
            next();
        } else {
            res.render('frameworks/details', {framework: framework});
        }
    });

    router.get('/frameworks/:slug/structure', (req, res, next) => {
        const framework = getAll().filter(f => f.slug === req.params.slug)[0];
        if (!framework) {
            next();
        } else {
            res.render('frameworks/structure', {framework: framework});
        }
    });

    router.get('/frameworks/:slug/comments', (req, res, next) => {
        const framework = getAll().filter(f => f.slug === req.params.slug)[0];
        if (!framework) {
            next();
        } else {
            res.render('frameworks/comments', {framework: framework});
        }
    });

    router.get('/frameworks/:slug/options', (req, res, next) => {
        const framework = getAll().filter(f => f.slug === req.params.slug)[0];
        if (!framework) {
            next();
        } else {
            res.render('frameworks/options', {framework: framework});
        }
    });
}

module.exports = {
    getAll: getAll,
    connectToDb: connectToDb,
    setupRoutes: setupRoutes
}