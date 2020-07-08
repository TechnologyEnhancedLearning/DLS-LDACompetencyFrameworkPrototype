const pool = require("./pool");

const addResult = async (selfAppraisal) => {
    try {
        const { rows } = await pool.query(
            `INSERT INTO learner_surveys (assessment_id, competency_id, confidence, relevance)
            VALUES ($1, $2, $3, $4)
            RETURNING id;`, [selfAppraisal.assessmentId, selfAppraisal.competencyId, selfAppraisal.confidence, selfAppraisal.relevance]
        );
        return rows && rows[0] && rows[0].id;
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

module.exports = {
    addResult: addResult
}