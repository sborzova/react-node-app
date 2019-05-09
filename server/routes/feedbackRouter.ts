const express = require('express');
const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Feedback = require('../models/feedback.ts');
const License = require('../models/license.ts');
const Device = require('../models/device.ts');
const DeviceStatus = require('../models/deviceStatus.ts');
const Reporter = require('../models/reporter.ts');
const KcwFunction = require('../models/kcwFunction.ts');
const db = require('../database.ts');

const feedbackRouter = express.Router();

feedbackRouter.get('/feedback/all', function(req, res, next) {
    Feedback.findAll({
        where: {
            upload_start: {
                [Op.gte]: moment(req.query.from, 'DD.MM.YYYY').format('YYYY-MM-DD'),
                [Op.lt]: moment(req.query.to, 'DD.MM.YYYY').add(1, 'day').format('YYYY-MM-DD')
            },
        },
        include: [{
            model: License,
        },{
            model: Device,
        },{
            model: DeviceStatus
        },{
            model: Reporter
        }
        ]
    })
    .then(data => {
        data.forEach(d => {
            let color = [];
            if (d.license && moment(d.license.expiration).isBefore(moment())){
                color.push('red');
                let devcount = parseInt(d.license.devcount);
                if (devcount && d.reporter){
                    if (devcount > d.reporter.reporter_users){
                        color.push('blue');
                    }
                    if (devcount > d.reporter.reporter_clients){
                        color.push('pink')
                    }
                }
            }
            if (d.deviceStatus){
                if (!d.deviceStatus.uptime.includes('day')){
                    color.push('black');
                }
                if (d.deviceStatus.n_panics != 0){
                    color.push('yellow');
                }
                if (d.deviceStatus.n_aborts != 0){
                    color.push('orange');
                }
                if (d.deviceStatus.core_dumps && d.deviceStatus.core_dumps.length > 0){
                    color.push('green');
                }
            }

            d.color = color;
        });
        res.status(200).send({
            data: data
        })
    }).catch((e) => console.log(e))
});

feedbackRouter.get('/feedback/:customer', function(req, res, next) {
    Feedback.findAll({
        where: {
            determined_customer: req.params.customer,
            upload_start: {
                [Op.gte]: moment(req.query.from, 'DD.MM.YYYY').format('YYYY-MM-DD'),
                [Op.lt]: moment(req.query.to, 'DD.MM.YYYY').add(1, 'day').format('YYYY-MM-DD')
            },
        },
        include: [{
            model: License,
        },{
            model: Device,
        },{
            model: DeviceStatus
        },{
            model: Reporter
        }
        ]
    })
        .then(data => {
            data.forEach(d => {
                let color = [];
                if (d.license && moment(d.license.expiration).isBefore(moment())){
                    color.push('red');
                    let devcount = parseInt(d.license.devcount);
                    if (devcount && d.reporter){
                        if (devcount > d.reporter.reporter_users){
                            color.push('blue');
                        }
                        if (devcount > d.reporter.reporter_clients){
                            color.push('pink')
                        }
                    }
                }
                if (d.deviceStatus){
                    if (!d.deviceStatus.uptime.includes('day')){
                        color.push('black');
                    }
                    if (d.deviceStatus.n_panics != 0){
                        color.push('yellow');
                    }
                    if (d.deviceStatus.n_aborts != 0){
                        color.push('orange');
                    }
                    if (d.deviceStatus.core_dumps.length > 0){
                        color.push('green');
                    }
                }

                d.color = color;
            });
            res.status(200).send({
                data: data
            })
        }).catch((e) => console.log(e))
});

feedbackRouter.get('/feedback/license/:serial', function(req, res, next) {
    Feedback.findAll({
        where: {
            upload_start: {
                [Op.gte]: moment(req.query.from, 'DD.MM.YYYY').format('YYYY-MM-DD'),
                [Op.lt]: moment(req.query.to, 'DD.MM.YYYY').add(1, 'day').format('YYYY-MM-DD')
            },
            '$License.serial$' : req.params.serial

        },
        include: [{
            model: License,
        },{
            model: Device,
        },{
            model: DeviceStatus
        },{
            model: Reporter
        }
        ]
    })
        .then(data => {

            data.forEach(d => {
                let color = [];
                if (d.license && moment(d.license.expiration).isBefore(moment())){
                    color.push('red');
                    let devcount = parseInt(d.license.devcount);
                    if (devcount && d.reporter){
                        if (devcount > d.reporter.reporter_users){
                            color.push('blue');
                        }
                        if (devcount > d.reporter.reporter_clients){
                            color.push('pink')
                        }
                    }
                }
                if (d.deviceStatus){
                    if (!d.deviceStatus.uptime.includes('day')){
                        color.push('black');
                    }
                    if (d.deviceStatus.n_panics != 0){
                        color.push('yellow');
                    }
                    if (d.deviceStatus.n_aborts != 0){
                        color.push('orange');
                    }
                    if (d.deviceStatus.core_dumps.length > 0){
                        color.push('green');
                    }
                }

                d.color = color;
            });
            res.status(200).send({
                data: data
            })
        }).catch((e) => console.log(e))
});

feedbackRouter.get('/feedback/detail/:id', function(req, res, next){
    Feedback.findAll({
        where: {
            fa_id: req.params.id
        },
        include: [{
            model: License
        },{
            model: Device
        },{
            model: DeviceStatus
        },{
            model: Reporter
        },{
            model: KcwFunction
        }]
    })
    .then(data => {
        res.status(200).send({
            data: data
        })
    })
});

feedbackRouter.get('/feedback/all/week' ,function(req, res, next) {
    db.query("SELECT count(*) AS count, DATE(upload_start) AS date " +
        "FROM feedback " +
        "WHERE upload_start BETWEEN DATE_SUB(CURDATE(), INTERVAL 6 DAY) AND DATE_SUB(CURDATE(), INTERVAL -1 DAY) " +
        "GROUP BY DATE(upload_start)",
        { type: db.QueryTypes.SELECT})
        .then(data => {
            res.status(200).send({
                data: data
            })
        })
});

feedbackRouter.get('/feedback/all/month', function(req, res, next) {
    db.query("SELECT count(*) AS count, DATE(upload_start) AS date " +
        "FROM feedback " +
        "WHERE upload_start BETWEEN DATE_SUB(CURDATE(), INTERVAL 31 DAY) AND DATE_SUB(CURDATE(), INTERVAL -1 DAY) " +
        "GROUP BY DATE(upload_start)",
        {type: db.QueryTypes.SELECT})
        .then(data => {
            res.status(200).send({
                data: data
            })
        })
});

feedbackRouter.get('/feedback/all/year', function(req, res, next) {
    db.query("SELECT count(*) AS count,DATE(upload_start) AS date " +
        "FROM feedback " +
        "WHERE upload_start BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND DATE_SUB(CURDATE(), INTERVAL -1 DAY) " +
        "GROUP by DATE(upload_start)",
        {type: db.QueryTypes.SELECT})
        .then(data => {
            res.status(200).send({
                data: data
            })
        })
});

feedbackRouter.get('/feedback/year/:customer', function(req, res, next) {
    db.query("SELECT count(*) AS count, DATE(upload_start) AS date " +
        "FROM feedback " +
        "WHERE determined_customer = :customer AND " +
        "upload_start BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND DATE_SUB(CURDATE(), INTERVAL -1 DAY) " +
        "GROUP by DATE(upload_start)",
        {replacements: {customer: req.params.customer}, type: db.QueryTypes.SELECT})
        .then(data => {
            res.status(200).send({
                data: data
            })
        })
});

feedbackRouter.get('/feedback/year/license/:serial', function(req, res, next) {
    db.query("SELECT count(*) AS count, DATE(upload_start) AS date " +
        "FROM feedback " +
        "WHERE fa_id IN (SELECT fa_id FROM license WHERE serial= :serial) AND " +
        "(upload_start BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND DATE_SUB(CURDATE(), INTERVAL -1 DAY)) " +
        "GROUP BY DATE(upload_start)",
        {replacements: {serial: req.params.serial}, type: db.QueryTypes.SELECT})
        .then(data => {
            res.status(200).send({
                data: data
            })
        })
});

module.exports = feedbackRouter;