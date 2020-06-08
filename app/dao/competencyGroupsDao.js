const pool = require('./pool.js');

const addCompetencyGroup = async (name, description) => {
    try {
        const { rows } = await pool.query(
            `INSERT INTO competency_groups (name, description) VALUES ($1, $2) RETURNING id;`, [name, description]
        );
        return rows[0].id;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

const addCompetencyGroupToFramework = async (competencyGroupId, frameworkId) => {
    try {
        await pool.query(
            `INSERT INTO competency_groups_frameworks (competency_group_id, framework_id, ordering)
            SELECT $1, $2, COALESCE(MAX(ordering), 0) + 1
                FROM competency_groups_frameworks
                WHERE framework_id = $2;`, [competencyGroupId, frameworkId]
        );
    } catch (e) {
        console.log(e);
        throw e;
    }
};

const getCompetencyGroupsForFramework = async (frameworkId) => {
    try {
        const { rows } = await pool.query(
            `SELECT cg.id, cg.name, cg.description, cgf.ordering
            FROM competency_groups_frameworks cgf
            JOIN competency_groups cg ON cg.id = cgf.competency_group_id
            WHERE cgf.framework_id = $1
            ORDER BY cgf.ordering;`, [frameworkId]
        );
        if (!rows) {
            return [];
        }
        for (group of rows) {
            group.competencies = await getCompetenciesForGroup(group.id);
        }
        return rows;
    } catch (e) {
        console.log(e);
        return null;
    }
};

const getAFrameworkForCompetencyGroup = async (competencyGroupId) => {
    try {
        const { rows } = await pool.query(
            `SELECT f.slug
            FROM frameworks f
            JOIN competency_groups_frameworks cgf ON f.id = cgf.framework_id
            WHERE cgf.competency_group_id = $1;`, [competencyGroupId]
        );
        return !!rows && rows[0].slug;
    } catch (e) {
        console.log(e);
        return null;
    }
};

const getCompetencyGroup = async (competencyGroupId) => {
    try {
        const { rows } = await pool.query(
            `SELECT id, name, description
            FROM competency_groups
            WHERE id = $1;`, [competencyGroupId]
        );
        return !!rows && rows[0];
    } catch (e) {
        console.log(e);
        return null;
    }
};

const getCompetenciesForGroup = async (groupId) => {
    try {
        const { rows } = await pool.query(
            `SELECT c.id, c.name, c.description
            FROM competencies c
            JOIN competency_groups cg
                ON c.competency_group_id = cg.id
            WHERE cg.id = $1`, [groupId]
        );
        return rows || [];
    } catch (e) {
        console.log(e);
        return [];
    }
};

module.exports = {
    addCompetencyGroup: addCompetencyGroup,
    addCompetencyGroupToFramework: addCompetencyGroupToFramework,
    getCompetencyGroupsForFramework: getCompetencyGroupsForFramework,
    getAFrameworkForCompetencyGroup: getAFrameworkForCompetencyGroup,
    getCompetencyGroup: getCompetencyGroup
}