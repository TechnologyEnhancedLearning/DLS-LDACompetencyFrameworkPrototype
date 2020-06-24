const pool = require('./pool');

const get = async (id) => {
    try {
        const { rows } = await pool.query(
            `SELECT user_id, job_role_id, date
            FROM assessments
            WHERE id=$1;`, [id]
        );
        return rows && rows[0];
    } catch (e) {
        console.log(e);
        return null;
    }
}

const getForUser = async (userId) => {
    try {
        const { rows } = await pool.query(
            `SELECT user_id, job_role_id, date
            FROM assessments
            WHERE user_id=$1`, [userId]
        );
        return rows;
    } catch (e) {
        console.log(e);
        return null;
    }}

const create = async (userId, jobRoleId) => {
    try {
        const { rows } = await pool.query(
            `INSERT INTO assessments (user_id, job_role_id)
            VALUES ($1, $2)
            RETURNING id;`, [userId, jobRoleId]
        );
        return rows && rows.length && rows[0].id;
    } catch (e) {
        console.log(e);
        return null;
    }
}

const assessCompetency = async (assessmentId, competencyId, score) => {
    try {
        const { rows } = await pool.query(
            `INSERT INTO assessment_components (assessment_id, competency_id, score)
            VALUES ($1, $2, $3)
            RETURNING id;`, [assessmentId, competencyId, score]);
        return rows && rows.length && rows[0];
    } catch (e) {
        console.log(e);
        return null;
    }
}

module.exports = {
    get: get,
    getForUser: getForUser,
    create: create,
    assessCompetency: assessCompetency
}