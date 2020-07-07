const pool = require("./pool");

const getForAssessment = async (assessmentId) => {
    try {
        const { rows } = await pool.query(
            `SELECT id, assessment_id, body, competency_ids
            FROM assessment_evidence
            WHERE assessment_id=$1;`, [ assessmentId ]
        );
        rows.forEach(row => {
            row.competencies = row.competency_ids.split(',');
        });
        return rows;
    } catch (e) {
        console.log(e);
        return [];
    }
}

const add = async (evidence) => {
    try {
        const { rows } = await pool.query(
            `INSERT INTO assessment_evidence (assessment_id, body, competency_ids, user_id)
            VALUES ($1, $2, $3, $4)
            RETURNING id;`, [evidence.assessmentId, evidence.body, evidence.competencyIds, evidence.userId]
        );
        return rows && rows[0] && rows[0].id;
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

module.exports = {
    getForAssessment: getForAssessment,
    add: add
}