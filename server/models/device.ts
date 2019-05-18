const sequelize = require('../database');
const Sequelize = require('sequelize');
const Feedback = require('../models/feedback.ts');


const Device = sequelize.define('device', {
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
        hostid: {
            type: Sequelize.STRING
        },
        hostname: {
            type: Sequelize.STRING
        },
        kernun_variant: {
            type: Sequelize.STRING
        },
        kernun_version: {
            type: Sequelize.STRING
        },
        dmi_product: {
            type: Sequelize.STRING
        },
        cpu_model: {
            type: Sequelize.STRING
        },
        cpu_number: {
            type: Sequelize.STRING
        },
        vm_guest: {
            type: Sequelize.STRING
        },
        callhome_status: {
            type: Sequelize.STRING
        }},
        {
            timestamps: false,
            tableName: 'device'
        }
);

module.exports = Device;