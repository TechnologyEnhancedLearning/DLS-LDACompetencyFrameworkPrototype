const pool = require('./pool');

const getRequirementsFromId = async (id) => {
    try {
        const { rows } = await pool.query(
            `SELECT r.factor_id, f.name AS factor_name, r.description, r.je_level
            FROM national_job_profile_requirements r
            JOIN national_job_profile_factors f
                ON f.id = r.factor_id
            WHERE r.national_job_profile_id = $1;`, [id]
        );
        return rows;
    } catch (e) {
        console.log(e);
        return null;
    }
}

const getFromId = async (id) => {
    try {
        const { rows } = await pool.query(
            `SELECT id, name, job_statement, category FROM national_job_profiles
            WHERE id = $1;`, [id]
        );
        if (!rows || !rows[0]) return undefined;
        rows[0].requirements = await getRequirementsFromId(id);
        return rows[0];
    } catch (e) {
        console.log(e);
        return null;
    }
}

const getCategories = async () => {
    // TODO select distinct(category) from national job profiles
    return [
        {
            'value': 'administrative-services',
            'text': 'Administrative services'
        },
        {
            'value': 'allied-health-professionals',
            'text': 'Allied health professionals'
        },
        {
            'value': 'emergency-services',
            'text': 'Emergency services'
        },
        {
            'value': 'health-science-services',
            'text': 'Health science services'
        },
        {
            'value': 'nursing-midwifery',
            'text': 'Nursing and midwifery'
        },
        {
            'value': 'personal-social-services',
            'text': 'Personal social services'
        },
        {
            'value': 'support-services',
            'text': 'Support services'
        },
        {
            'value': 'professional-managers',
            'text': 'Professional managers'
        }
    ];
}

const getProfilesForCategory = async (category) => {
    try {
        const { rows } = await pool.query(
            `SELECT id AS value, name AS text
            FROM national_job_profiles
            ORDER BY id ASC;`
        ); // TODO actually perform category search
        return rows;
    } catch (e) {
        console.log(e);
        return [];
    }
}

module.exports = {
    getFromId: getFromId,
    getCategories: getCategories,
    getProfilesForCategory: getProfilesForCategory
}