const pool = require('./pool');

const getRequirementsFromId = async (id) => {
    try {
        const { rows } = await pool.query(
            `SELECT r.factor_id, f.name AS factor_name, r.description, r.je_level
            FROM national_job_profile_requirements r
            JOIN national_job_profile_factors f
                ON f.id = r.factor_id
            WHERE r.national_job_profile_id = $1;`, [id]
        );
        return rows;
    } catch (e) {
        console.log(e);
        return null;
    }
}

const getFromId = async (id) => {
    try {
        const { rows } = await pool.query(
            `SELECT name, job_statement FROM national_job_profiles
            WHERE id = $1;`, [id]
        );
        if (!rows || !rows[0]) return undefined;
        rows[0].requirements = await getRequirementsFromId(id);
        return rows[0];
    } catch (e) {
        console.log(e);
        return null;
    }
}

module.exports = {
    getFromId: getFromId
}