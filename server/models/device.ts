const sequelize = require('../database.ts');
const Sequelize = require('sequelize');
const License = require('../models/license.ts');

const Feedback = sequelize.define('feedback', {
    fa_id: {
        type: Sequelize.INTEGER(11), primaryKey: true
    },
    determined_customer: {
        type: Sequelize.STRING
    },
    upload_start: {
        type: Sequelize.DATE
    },
    upload_finish: {
        type: Sequelize.DATE
    },
    processed: {
        type: Sequelize.DATE
    },
    feedback_ip: {
        type: Sequelize.STRING
    },
    feedback_hostname: {
        type: Sequelize.STRING
    },
    fn: {
        type: Sequelize.STRING
    },
    size: {
        type: Sequelize.INTEGER(11)
    },
    hits: {
        type: Sequelize.INTEGER(11)
    },
    domains: {
        type: Sequelize.INTEGER(11)
    }},
    {
        timestamps: false,
        tableName: 'feedback'
    }
);

Feedback.hasOne(License, {foreignKey: 'fa_id'});
module.exports = Feedback;