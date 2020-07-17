const pool = require('./pool');

const create = async (name, description, profileId) => {
    try {
        const { rows } = await pool.query(
            `INSERT INTO job_roles (name, description, national_job_profile_id)
            VALUES ($1, $2, $3)
            RETURNING id;`, [name, description, profileId || null]
        );
        return rows && rows[0].id;
    } catch (e) {
        console.log(e);
        return false;
    }
}

const addRequirementToRole = async (jobRoleId, competencyId) => {
    try {
        const { rows } = await pool.query(
            `INSERT INTO job_role_requirements (job_role_id, competency_id)
            VALUES ($1, $2);`, [jobRoleId, competencyId]
        )
        return rows && rows[0];
    } catch (e) {
        console.log(e);
        return false;
    }
}

const getRequirementsForRole = async (id) => {
    try {
        const { rows } = await pool.query(
            `SELECT c.name AS competency_name, c.id AS competency_id
            FROM job_role_requirements r
            JOIN competencies c ON c.id = r.competency_id
            WHERE r.job_role_id = $1
            ORDER BY c.id;`, [id]
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
            `SELECT j.id, j.name, j.description, j.national_job_profile_id, j.public
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

const getPublic = async () => {
    try {
        const { rows } = await pool.query(
            `SELECT j.id, j.name, j.description, j.public
            FROM job_roles j
            WHERE j.public
            ORDER BY j.id ASC;`);
        return rows || [];
    } catch (e) {
        console.log(e);
        return null;
    }
}

const getMine = async (userId) => {
    try {
        const { rows } = await pool.query(
            `SELECT j.id, j.name, j.description, j.public, j.owner_id
            FROM job_roles j
            WHERE j.owner_id = $1
            ORDER BY j.id ASC;`, [userId]
        );
        return rows || [];
    } catch (e) {
        console.log(e);
        return [];
    }
}

module.exports = {
    create: create,
    addRequirementToRole: addRequirementToRole,
    getJobRole: getJobRole,
    getPublic: getPublic,
    getMine: getMine
}
