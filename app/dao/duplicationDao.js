const pool = require('./pool');

const getSimilarFrameworks = async (frameworkTitle) => {
    try {
        const { rows } = await pool.query(
            `SELECT f.title, f.slug, u.name AS owner
        FROM frameworks f
        JOIN users u ON u.id = f.owner_id
        WHERE f.id IN (1, 2);`);
        return rows;
    } catch (e) {
        console.error(e);
        return [];
    }
};

module.exports = {
    getSimilarFrameworks: getSimilarFrameworks
}