const pool = require('./pool');

const get = async (id) => {
    try {
        const { rows } = await pool.query(
            `SELECT id, user_id, job_role_id, date
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

const getComponentsFor = async (assessmentId) => {
    try {
        const { rows } = await pool.query(
            `SELECT a.id AS assessment_id, c.name AS competency_name, c.id AS competency_id, jr.job_role_id, ac.id AS existing_assessment, ac.score
            FROM competencies c
            JOIN job_role_requirements jr ON c.id = jr.competency_id
            JOIN assessments a ON a.job_role_id = jr.job_role_id
            LEFT JOIN assessment_components ac ON ac.competency_id = c.id
            WHERE a.id = $1;`, [ assessmentId ]
        );
        return rows;
    } catch (e) {
        console.log(e);
        return [];
    }
}

module.exports = {
    get: get,
    getForUser: getForUser,
    create: create,
    assessCompetency: assessCompetency,
    getComponentsFor: getComponentsFor
}