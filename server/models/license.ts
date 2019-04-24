const Feedback = require('../models/feedback.ts');

const sequelize = require('../database.ts');
const Sequelize = require('sequelize');

const License = sequelize.define('license', {
    id: {
        type: Sequelize.INTEGER(11), primaryKey: true
    },
    fa_id: {
        type: Sequelize.INTEGER(11),
        references: {
            model: Feedback,
            key: 'fa_id',
        }
    },
    ident: {
        type: Sequelize.STRING
    },
    customer: {
        type: Sequelize.STRING
    },
    serial: {
        type: Sequelize.STRING
    },
    devcount: {
        type: Sequelize.STRING
    },
    hw: {
        type: Sequelize.STRING
    },
    expiration: {
        type: Sequelize.TEXT
    },
    upgrade: {
        type: Sequelize.STRING
    },
    group_type: {
        type: Sequelize.STRING
    },
    saleType: Sequelize.VIRTUAL,
    licenseType: Sequelize.VIRTUAL,
    },
    {
        timestamps: false,
        tableName: 'license'
    }
);


//License.hasOne(Feedback, {foreignKey: 'fa_id'});
module.exports = License;