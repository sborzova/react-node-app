const sequelize = require('../database');
const Sequelize = require('sequelize');
const License = require('../models/license');
const Device = require('../models/device');
const DeviceStatus = require('../models/deviceStatus');
const Reporter = require('../models/reporter');
const KcwFunction = require('../models/kcwFunction');
const TIMESTAMP = require('sequelize-mysql-timestamp')(sequelize, { warnings: false });


const Feedback = sequelize.define('feedback', {
    fa_id: {
        type: Sequelize.INTEGER(11), primaryKey: true
    },
    determined_customer: {
        type: Sequelize.STRING
    },
    upload_start: {
        type: TIMESTAMP
    },
    upload_finish: {
        type: TIMESTAMP
    },
    processed: {
        type: TIMESTAMP
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
    },
    status: Sequelize.VIRTUAL,
    },

    {
        timestamps: false,
        tableName: 'feedback'
    }
);

Feedback.hasOne(License, {foreignKey: 'fa_id'});
Feedback.hasOne(Device, {foreignKey: 'fa_id'});
Feedback.hasOne(DeviceStatus, {foreignKey: 'fa_id'});
Feedback.hasOne(Reporter, {foreignKey: 'fa_id'});
Feedback.hasOne(KcwFunction, {foreignKey: 'fa_id'});

module.exports = Feedback;