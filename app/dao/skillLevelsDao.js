const pool = require('./pool');

const getForCompetency = async (competencyId) => {
    try {
        const { rows } = await pool.query(
            `SELECT s.id, s.name, s.description, s.ordering
            FROM skill_levels s
            WHERE s.competency_id = $1
            ORDER BY s.ordering ASC;`, [competencyId]
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

const getSkillLevel = async (competencyId, ordering) => {
    try {
        const { rows } = await pool.query(
            `SELECT s.id, s.name, s.description, s.ordering, s.competency_id, c.name AS competency_name, cg.id AS competency_group_id, cg.name AS competency_group_name
            FROM skill_levels s
            JOIN competencies c ON c.id = s.competency_id
            JOIN competency_groups cg ON cg.id = c.competency_group_id
            WHERE s.competency_id = $1 AND s.ordering = $2;`, [competencyId, ordering]
        );
        if (!rows || !rows.length) {
            return null;
        }
        let level = rows[0];
        level.criteria = await getCriteriaForSkillLevel(level.id);
        return level;
    } catch (e) {
        console.log(e);
        return null;
    }
}

const getSkillLevelFromId = async (id) => {
    try {
        const { rows } = await pool.query(
            `SELECT s.id, s.name, s.description, s.ordering, s.competency_id, c.name AS competency_name, cg.id AS competency_group_id, cg.name AS competency_group_name
            FROM skill_levels s
            JOIN competencies c ON c.id = s.competency_id
            JOIN competency_groups cg ON cg.id = c.competency_group_id
            WHERE s.id = $1;`, [id]
        );
        if (!rows || !rows.length) {
            return null;
        }
        return rows[0];
    } catch (e) {
        console.log(e);
        return null;
    }
}

const getCriteriaForSkillLevel = async (skillLevelId) => {
    try {
        const { rows } = await pool.query(
            `SELECT c.id, c.name, c.description, c.ordering
            FROM skill_level_criteria c
            WHERE skill_level_id = $1
            ORDER BY c.ordering ASC;`, [skillLevelId]
        );
        return rows || [];
    } catch (e) {
        console.log(e);
        return [];
    }
};

const addSkillLevel = async (competencyId, name, description, ordering) => {
    try {
        const { rows } = await pool.query(
            `INSERT INTO skill_levels (name, description, ordering, competency_id)
            VALUES ($1, $2, $3, $4)
            RETURNING id;`, [name, description, ordering, competencyId]
        );
        return !!rows && rows[0].id;
    } catch (e) {
        console.log(e);
        return null;
    }
};

const addTemplateSkillLevels = async (competencyId, levelNames) => {
    levelNames.forEach(async (levelName, index) => {
        await addSkillLevel(competencyId, levelName, 'Add a description of this skill level here.', index);
    });
};

const addCriterion = async (skillLevelId, ordering, criterion) => {
    await pool.query(`INSERT INTO skill_level_criteria (name, description, ordering, skill_level_id)
        VALUES ($1, $2, $3, $4)`, [criterion.name, criterion.description, ordering, skillLevelId]);
}

const setCriteriaForSkillLevel = async (skillLevelId, criteria) => {
    await pool.query(`DELETE FROM skill_level_criteria WHERE skill_level_id = $1;`, [skillLevelId]);
    criteria.forEach(async (criterion, index) => {
        await addCriterion(skillLevelId, index, criterion);
    });
}

const updateSkillLevel = async (competencyId, ordering, request) => {
    try {
        const skillLevel = await getSkillLevel(competencyId, ordering);
        if (!skillLevel) return false;

        await pool.query(`UPDATE skill_levels SET description = $1
            WHERE id = $2`, [request.description, skillLevel.id])
        await setCriteriaForSkillLevel(skillLevel.id, request.criteria)
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getForCompetency: getForCompetency,
    getSkillLevel: getSkillLevel,
    getSkillLevelFromId: getSkillLevelFromId,
    addTemplateSkillLevels: addTemplateSkillLevels,
    updateSkillLevel: updateSkillLevel
}
