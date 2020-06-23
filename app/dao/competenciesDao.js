const pool = require('./pool.js');

const addCompetencyToGroup = async (competencyGroupId, competency) => {
    try {
        const { rows } = await pool.query(
            `INSERT INTO competencies (name, description, ordering)
            SELECT $1, $2, COALESCE(MAX(ordering), 0) + 1
                FROM competencies
                WHERE competency_group_id = $3
            RETURNING id;`, [competency.name, competency.description, competencyGroupId]
        );
        return !!rows && rows[0].id;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

const addCompetencyToFramework = async (frameworkId, competency) => {
    try {
        const { rows } = await pool.query(
            `INSERT INTO competencies (name, description, ordering)
            VALUES ($1, $2, 1)
            RETURNING id;`, [competency.name, competency.description]
        );
        if (!rows) return null;
        const competencyId = rows[0].id;
        await pool.query(
            `INSERT INTO frameworks_structure (framework_id, competency_id, ordering)
            SELECT $1, $2, COALESCE(MAX(ordering), 0) + 1
                FROM frameworks_structure
                WHERE framework_id = $1`, [frameworkId, competencyId]
        );
        return competencyId;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

const getCompetency = async (id) => {
    try {
        const { rows } = await pool.query(
            `SELECT c.id, c.name, c.description, c.ordering, c.competency_group_id, cg.name AS competency_group_name
            FROM competencies c
            LEFT JOIN competency_groups cg
                ON c.competency_group_id = cg.id
            WHERE c.id = $1;`, [id]
        );
        return !!rows && rows[0];
    } catch (e) {
        console.log(e);
        return null;
    }
}

const getForFramework = async (frameworkId) => {
    try {
        const { rows } = await pool.query(
            `SELECT c.id, c.name, c.description, c.ordering, c.competency_group_id
            FROM competencies c
            WHERE c.framework_id = $1;`, [frameworkId]
        );
        return rows;
    } catch (e) {
        console.log(e);
        return null;
    }
}

const getAll = async () => {
    try {
        const { rows } = await pool.query(
            `SELECT c.id, c.name, c.description, c.ordering, c.competency_group_id
            FROM competencies c;`
        );
        return rows;
    } catch (e) {
        console.log(e);
        return null;
    }
}

module.exports = {
    addCompetencyToGroup: addCompetencyToGroup,
    addCompetencyToFramework: addCompetencyToFramework,
    getCompetency: getCompetency,
    getForFramework: getForFramework,
    getAll: getAll
}