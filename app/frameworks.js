const pool = require('./pool.js');
const sampleData = require('./sample-data');

const connectToDb = async () => {
    const client = await pool.get().connect();

    client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            console.log(JSON.stringify(row));
        }
        client.end();
    });
}

const getAll = () => {
    // qq pull from db
    return sampleData.frameworks;
};

module.exports = {
    getAll: getAll,
    connectToDb: connectToDb
}