const sequelize = require('../database.ts');
const Sequelize = require('sequelize');
const License = require('../models/license.ts');
const Device = require('../models/device.ts');
const DeviceStatus = require('../models/deviceStatus.ts');
const Reporter = require('../models/reporter.ts');
const KcwFunction = require('../models/kcwFunction.ts');
const TIMESTAMP = require('sequelize-mysql-timestamp')(sequelize);


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
    color: Sequelize.VIRTUAL,
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