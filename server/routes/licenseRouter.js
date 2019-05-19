const Feedback = require('../models/feedback');
const License = require('../models/license');
const Device = require('../models/device');
const utils = require('../utils/utils');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const express = require('express');
const moment = require('moment');
const db = require('../database');

const licenseRouter = express.Router();

licenseRouter.get('/licenses' ,function(req, res, next) {
    db.query("SELECT a.fa_id, a.determined_customer, a.upload_start, a.serial, expiration, upgrade, ident, kernun_variant" +
        " FROM " +
        "(SELECT feedback.fa_id, determined_customer, upload_start, serial, expiration, upgrade, ident  " +
        "FROM  " +
        "feedback  " +
        "LEFT JOIN license  " +
        "ON feedback.fa_id = license.fa_id " +
        "WHERE feedback.upload_start BETWEEN DATE_SUB(DATE(NOW()),INTERVAL 1 MONTH) AND DATE_SUB(CURDATE(), INTERVAL -1 DAY)) AS a " +
        " INNER JOIN  " +
        "( " +
        "SELECT determined_customer, license.serial AS serial, MAX(upload_start) AS upload_start " +
        " FROM feedback  " +
        " LEFT JOIN license " +
        " ON feedback.fa_id = license.fa_id " +
        " WHERE feedback.upload_start BETWEEN DATE_SUB(DATE(NOW()),INTERVAL 1 month) AND DATE_SUB(CURDATE(), INTERVAL -1 DAY) " +
        " GROUP BY license.serial) " +
        "AS b " +
        "ON a.upload_start = b.upload_start AND a.serial = b.serial " +
        "LEFT JOIN " +
        "device " +
        "ON a.fa_id = device.fa_id " +
        "ORDER BY upgrade DESC", { type: db.QueryTypes.SELECT}
    ).then(data => {
        let licenses = utils.processDataLicenses(data);
        res.status(200).send({
            data: licenses
        })
    })
    .catch(next)
});

licenseRouter.get('/license/detail/:serial' ,function(req, res, next) {
    Feedback.findOne({
        where: {
            upload_start: {
                [Op.gte]: moment().startOf('day').subtract(1, 'month'),
                [Op.lte]: moment().endOf('day'),
            },
            '$License.serial$' : req.params.serial
        },
        include: [{
            model: License
        },{
            model: Device
        }
        ],
        order: [
            [Sequelize.fn('max', Sequelize.col('license.upgrade')), 'DESC'],
        ]
    }).then(data => {
        res.status(200).send({
            data: data
        })
    })
    .catch(next)
});

module.exports = licenseRouter;