const pool = require('./pool.js');

const addCompetency = async (competencyGroupId, competency) => {
    try {
        const { rows } = await pool.query(
            `INSERT INTO competencies (name, description, ordering, competency_group_id)
            SELECT $1, $2, COALESCE(MAX(ordering), 0) + 1, $3
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

module.exports = {
    addCompetency: addCompetency,
    getCompetency: getCompetency,
    getForFramework: getForFramework
}