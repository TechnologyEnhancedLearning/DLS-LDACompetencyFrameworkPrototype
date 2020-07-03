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

module.exports = {
    getForAssessment: getForAssessment
}