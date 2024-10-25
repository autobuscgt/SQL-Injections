const {Sequelize} = require('sequelize')
module.exports = new Sequelize(
    'test_SQL',
    'postgres',
    '1',
    {
        dialect:'postgres'
    }

)