const pool = require('./pool');

const getForCompetency = async (competencyId) => {
    try {
        const { rows } = await pool.query(
            `SELECT id, description, ordering, type
            FROM competency_criteria
            WHERE competency_id = $1
            ORDER BY ordering ASC;`, [competencyId]
        );
        if (!rows || !rows.length) {
            return {};
        }
        return {
            knowledgeAndUnderstanding: rows.filter(r => r.type === 'knowledge-understanding'),
            abilities: rows.filter(r => r.type === 'ability')
        };
    } catch (e) {
        console.log(e);
        return null;
    }
};

module.exports = {
    getForCompetency: getForCompetency
}
