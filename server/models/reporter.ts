const sequelize = require('../database');
const Sequelize = require('sequelize');
const Feedback = require('../models/feedback.ts');

const Reporter = sequelize.define('reporter', {
        id: {
            type: Sequelize.INTEGER(11), primaryKey: true
        },
        fa_id: {
            type: Sequelize.INTEGER(11),
            references: {
                model: Feedback,
                key: 'fa_id'
            }
        },
        reporter_min_time: {
        type: Sequelize.STRING
        },
        reporter_max_time: {
        type: Sequelize.STRING
        },
        reporter_users: {
        type: Sequelize.STRING
        },
        reporter_clients: {
        type: Sequelize.STRING
        },
        reporter_cw_categorized: {
        type: Sequelize.STRING
        },
        reporter_cw_total: {
        type: Sequelize.STRING
        },
        reporter_web_categorized: {
        type: Sequelize.STRING
        },
        reporter_web_total: {
        type: Sequelize.STRING
        }},
    {
        timestamps: false,
        tableName: 'reporter'
    }
);

module.exports = Reporter;