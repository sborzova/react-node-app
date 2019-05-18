const sequelize = require('../database');
const Sequelize = require('sequelize');
const Feedback = require('../models/feedback.ts');

const KcwFunction = sequelize.define('kcwFunction', {
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
        cw_deployment: {
        type: Sequelize.STRING
        },
        cw_dhcp_client: {
        type: Sequelize.STRING
        },
        cw_netif_devices: {
        type: Sequelize.STRING
        },
        cw_time_zone: {
        type: Sequelize.STRING
        },
        cw_sshd_enabled: {
        type: Sequelize.STRING
        },
        cw_sshd_kernun: {
        type: Sequelize.STRING
        },
        cw_auto_update: {
        type: Sequelize.STRING
        },
        cw_log_rotation: {
        type: Sequelize.STRING
        },
        cw_proxy_lang: {
        type: Sequelize.STRING
        },
        cw_hand_off: {
        type: Sequelize.STRING
        },
        cw_dhcp_server: {
            type: Sequelize.STRING
        },
        cw_https_insp: {
            type: Sequelize.STRING
        },
        cw_auth: {
            type: Sequelize.STRING
        },
        cw_antivirus: {
            type: Sequelize.STRING
        },
        // cw_dnssec: {
        //     type: Sequelize.STRING
        // },
        // cw_ipv6_enabled: {
        //     type: Sequelize.STRING
        // },
        // cw_cluster_type: {
        //     type: Sequelize.STRING
        // },
        // cw_cluster_status: {
        //     type: Sequelize.STRING
        // },
        // cw_safe_search: {
        //     type: Sequelize.STRING
        // },
        // cw_netaddr_objects: {
        //     type: Sequelize.STRING
        // },
        // cw_snmpd_enabled: {
        //     type: Sequelize.STRING
        // },
        // cw_security_admin: {
        //     type: Sequelize.STRING
        // },
        // cw_system_admin: {
        //     type: Sequelize.STRING
        // },
        // cw_https_custom_good_ca: {
        //     type: Sequelize.STRING
        // },
        // cw_https_custom_bad_ca: {
        //     type: Sequelize.STRING
        // },
        // cw_av_type: {
        //     type: Sequelize.STRING
        // },
        // cw_av_security_levelm: {
        //     type: Sequelize.STRING
        // },
        // cw_sso_enabled: {
        //     type: Sequelize.STRING
        // }
        },
        {
            timestamps: false,
            tableName: 'kcw_function'
        }
);

module.exports = KcwFunction;