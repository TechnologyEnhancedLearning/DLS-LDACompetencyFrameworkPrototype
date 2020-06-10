const pool = require('./pool');

const getRequirementsForRole = async (id) => {
    try {
        const { rows } = await pool.query(
            `SELECT c.name AS competency_name, c.id AS competency_id, s.name AS skill_level_name, s.id AS skill_level_id
            FROM role_requirements r
            JOIN skill_levels s ON s.id = r.skill_level_id
            JOIN competencies c ON c.id = s.competency_id
            WHERE r.job_role_id = $1;`, [id]
        );
        return rows || [];
    } catch (e) {
        console.log(e);
        return null;
    }
};

const getJobRole = async (id) => {
    try {
        const { rows } = await pool.query(
            `SELECT j.id, j.name, j.description
            FROM job_roles j
            WHERE j.id = $1;`, [id]
        );
        if (!rows || !rows.length) return undefined;
        rows[0].requirements = await getRequirementsForRole(id);
        return rows[0];
    } catch (e) {
        console.log(e);
        return null;
    }
};

const getAll = async () => {
    try {
        const { rows } = await pool.query(
            `SELECT j.id, j.name, j.description
            FROM job_roles j;`);
        return rows || [];
    } catch (e) {
        console.log(e);
        return null;
    }
}

module.exports = {
    getJobRole: getJobRole,
    getAll: getAll
}
