const Feedback = require('../models/feedback.ts');
const License = require('../models/license.ts');
const Device = require('../models/device.ts');

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
        "ORDER BY upgrade", { type: db.QueryTypes.SELECT}
    ).then(data => {
        data = [].concat.apply([], data);
        data.forEach(d => {
            if (d.expiration == 'unlimited'){
                 d.saleType = 'sale';
            }else {
                    d.saleType = 'rental'
            }
            if (d.determined_customer){
                if (d.determined_customer.match('EDU')){
                    d.licenseType = 'edu';
                }else if (d.determined_customer.match('TEST')){
                    d.licenseType = 'test';
                }else if(d.determined_customer.match('NFR')){
                    d.licenseType = 'nfr';
                }
            }
        });
        res.status(200).send({
            data: data
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
    }).then(d => {
        if (d.license && d.license.expiration){
            if (d.license.expiration === 'unlimited'){
                d.license.saleType = 'sale'
            }else {
                if (d.license.expiration.length > 0)
                    d.license.saleType = 'rental'
            }
        }
        if (d.determined_customer.match('EDU')){
            d.license.licenseType = 'edu';
        }else if (d.determined_customer.match('TEST')){
            d.license.licenseType = 'test';
        }else if(d.determined_customer.match('NFR')){
            d.license.licenseType = 'nfr';
        }
        res.status(200).send({
            data: d
        })
    })
    .catch(next)
});

module.exports = licenseRouter;