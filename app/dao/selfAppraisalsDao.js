const pool = require("./pool");

const addResult = async (selfAppraisal) => {
    try {
        const { rows } = await pool.query(
            `INSERT INTO self_appraisal_questions (assessment_id, competency_id, confidence, relevance)
            VALUES ($1, $2, $3, $4)
            RETURNING id;`, [selfAppraisal.assessmentId, selfAppraisal.competencyId, selfAppraisal.confidence, selfAppraisal.relevance]
        );
        return rows && rows[0] && rows[0].id;
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

const getResultsForAssessment = async (assessmentId) => {
    try {
        const { rows } = await pool.query(
            `SELECT c.name AS competency_name, q.confidence, q.relevance
            FROM self_appraisal_questions q
            JOIN competencies c ON c.id = q.competency_id
            WHERE q.assessment_id = $1;`, [assessmentId]
        );
        return rows;
    } catch (e) {
        console.log(e);
        return [];
    }
}

module.exports = {
    addResult: addResult,
    getResultsForAssessment: getResultsForAssessment
}