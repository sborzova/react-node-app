const sequelize = require('../database.ts');
const Sequelize = require('sequelize');
const Feedback = require('../models/feedback.ts');

const DeviceStatus = sequelize.define('deviceStatus', {
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
        uptime: {
                type: Sequelize.STRING
        },
        disk_space: {
                type: Sequelize.STRING
        },
        system_table: {
                type: Sequelize.STRING
        },
        vm_stat: {
                type: Sequelize.STRING
        },
        core_dumps: {
                type: Sequelize.STRING
        },
        rrd_proxies: {
                type: Sequelize.STRING
        },
        n_panics: {
                type: Sequelize.STRING
        },
        n_aborts: {
                type: Sequelize.STRING
        },
    //     n_deadlocks: {
    //     type: Sequelize.STRING
    // }
        },
    {
        timestamps: false,
        tableName: 'device_status'
    }
);

module.exports = DeviceStatus;