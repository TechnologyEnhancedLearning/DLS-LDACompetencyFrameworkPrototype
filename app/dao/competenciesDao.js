const pool = require('./pool.js');

const addCompetency = async (competency) => {
    try {
        const { rows } = await pool.query(
            `INSERT INTO competencies (name, description, competency_group_id) VALUES ($1, $2, $3) RETURNING id;`,
            [competency.name, competency.description, competency.competencyGroupId]
        );
        return rows[0].id;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = {
    addCompetency: addCompetency
}