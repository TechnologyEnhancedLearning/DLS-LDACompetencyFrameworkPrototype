const pool = require('./pool');

const getForCompetency = async (competencyId) => {
    try {
        const { rows } = await pool.query(
            `SELECT s.id, s.name, s.description, s.ordering
            FROM skill_levels s
            WHERE s.competency_id = $1;`, [competencyId]
        );
        if (!rows) {
            return [];
        }
        for (level of rows) {
            level.criteria = await getCriteriaForSkillLevel(level.id);
        }
        return rows;
    } catch (e) {
        console.log(e);
        return null;
    }
};

const getCriteriaForSkillLevel = async (skillLevelId) => {
    try {
        const { rows } = await pool.query(
            `SELECT c.id, c.name, c.description, c.ordering
            FROM skill_level_criteria c
            WHERE skill_level_id = $1;`, [skillLevelId]
        );
        return rows || [];
    } catch (e) {
        console.log(e);
        return [];
    }
};

module.exports = {
    getForCompetency: getForCompetency
}