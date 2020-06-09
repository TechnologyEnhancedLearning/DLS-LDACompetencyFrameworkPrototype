const pool = require('./pool');

const fakeout = async (name, entityName) => {
    if (name.charAt(0).toLowerCase() > 'l') {
        return {
            "description": `${entityName} name matches closely with another ${entityName.toLowerCase()}.`
        }
    }
    return undefined;
}

const getForCompetencyGroup = async (group) => {
    return await fakeout(group.name, "Competency group");
};

const getForCompetency = async (competency) => {
    return await fakeout(competency.name, "Competency");
};

const getSimilarFrameworks = async (frameworkTitle) => {
    try {
        const { rows } = await pool.query(
            `SELECT f.title, f.slug, u.name AS owner
        FROM frameworks f
        JOIN users u ON u.id = f.owner_id
        WHERE f.id IN (1, 2);`);
        return rows;
    } catch (e) {
        console.error(e);
        return [];
    }
};

module.exports = {
    getForCompetencyGroup: getForCompetencyGroup,
    getForCompetency: getForCompetency,
    getSimilarFrameworks: getSimilarFrameworks
}