const pool = require('./pool');

const create = async (name, description) => {
    try {
        const { rows } = await pool.query(
            `INSERT INTO job_roles (name, description)
            VALUES ($1, $2) RETURNING id;`, [name, description]
        );
        return rows && rows[0];
    } catch (e) {
        console.log(e);
        return false;
    }
}

const getRequirementsForRole = async (id) => {
    try {
        const { rows } = await pool.query(
            `SELECT c.name AS competency_name, c.id AS competency_id, s.name AS skill_level_name, s.id AS skill_level_id
            FROM job_role_requirements r
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
            `SELECT j.id, j.name, j.description, j.national_job_profile_id
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
    create: create,
    getJobRole: getJobRole,
    getAll: getAll
}
