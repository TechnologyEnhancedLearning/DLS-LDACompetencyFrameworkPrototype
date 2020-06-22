const pool = require('./pool.js');
const competenciesDao = require('./competenciesDao');
const competencyGroupsDao = require('./competencyGroupsDao');

const getAll = async () => {
    try {
        const { rows } = await pool.query(
            `SELECT f.title, f.slug, f.status, u.name AS owner, working_group as working_group
        FROM frameworks f
        JOIN users u ON u.id = f.owner_id
        LEFT JOIN (
            SELECT wg.framework_id AS framework_id, STRING_AGG(wgu.name, ',') AS working_group
            FROM working_groups_links wg
            JOIN users wgu ON wgu.id = wg.user_id
            GROUP BY wg.framework_id
        ) wg_info ON wg_info.framework_id = f.id;`);
        return rows;
    } catch (e) {
        console.error(e);
        return [];
    }
};

const getFromSlug = async (slug) => {
    try {
        const { rows } = await pool.query(
            `SELECT f.id, f.title, f.slug, f.status, u.name AS owner, working_group as working_group
        FROM frameworks f
        JOIN users u ON u.id = f.owner_id
        LEFT JOIN (
            SELECT wg.framework_id AS framework_id, STRING_AGG(wgu.name, ',') AS working_group
            FROM working_groups_links wg
            JOIN users wgu ON wgu.id = wg.user_id
            GROUP BY wg.framework_id
        ) wg_info ON wg_info.framework_id = f.id
        WHERE f.slug = $1;`, [slug]);
        return !!rows && rows[0];
    } catch (e) {
        console.error(e);
        return null;
    }
}

const getStructure = async (id) => {
    try {
        const { rows } = await pool.query(
            `SELECT competency_group_id, competency_id, ordering
            FROM frameworks_structure
            WHERE framework_id=$1
            ORDER BY ordering ASC;`, [id]
        );
        for (let i = 0; i < rows.length; i++) {
            if (!rows[i].competency_id) {
                console.log("Appending competency group");
                rows[i].competencyGroup = await competencyGroupsDao.getCompetencyGroup(rows[i].competency_group_id);
                console.log(rows[i].competencyGroup);
            } else {
                console.log("Appending competency");
                rows[i].competency = await competenciesDao.getCompetency(rows[i].competency_id);
            }
        }
        return rows;
    } catch (e) {
        console.log(e);
        return null;
    }
}

const addFramework = async (title, slug, currentUser) => {
    try {
        const { rows } = await pool.query(`INSERT INTO frameworks (title, slug, owner_id) VALUES ($1, $2, $3) RETURNING id;`, [title, slug, currentUser]);
        return rows[0].id;
    } catch (e) {
        console.log(e);
        throw e;    
    }
}

const setStatus = async (slug, newStatus) => {
    try {
        const { rows } = await pool.query(`UPDATE frameworks SET status = $1 WHERE SLUG = $2 RETURNING status;`, [newStatus, slug]);
        return rows && rows[0];
    } catch (e) {
        console.log(e);
        throw e;
    }
}

module.exports = {
    getAll: getAll,
    getFromSlug: getFromSlug,
    getStructure: getStructure,
    addFramework: addFramework,
    setStatus: setStatus
}