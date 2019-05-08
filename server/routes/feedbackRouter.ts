const Feedback = require('../models/feedback.ts');
const License = require('../models/license.ts');
const Device = require('../models/device.ts');
const DeviceStatus = require('../models/deviceStatus.ts');
const Reporter = require('../models/reporter.ts');
const KcwFunction = require('../models/kcwFunction.ts');
const db = require('../database.ts');

const express = require('express');
const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const feedbackRouter = express.Router();

feedbackRouter.get('/feedback', function(req, res, next) {
    Feedback.findAll({
        where: {
            upload_start: {
                [Op.gte]: moment(req.query.from, 'DD.MM.YYYY').startOf('day'),
                [Op.lte]: moment(req.query.to, 'DD.MM.YYYY').endOf("day"),
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
                [Op.gte]: moment(req.query.from, 'DD.MM.YYYY').startOf('day'),
                [Op.lte]: moment(req.query.to, 'DD.MM.YYYY').endOf('day'),
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
                [Op.gte]: moment(req.query.from, 'DD.MM.YYYY').startOf('day'),
                [Op.lte]: moment(req.query.to, 'DD.MM.YYYY').endOf('day'),
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

feedbackRouter.get('/feedback/week' ,function(req, res, next) {
    console.log('tu');
    db.query("select count(*) as count, DATE(upload_start) as date from feedback " +
        "where upload_start BETWEEN DATE_SUB(NOW(), INTERVAL 6 DAY) AND NOW() group by DATE(upload_start)",
        { type: db.QueryTypes.SELECT})
    .then(data => {
        res.status(200).send({
            data: data
        })
    })
});

feedbackRouter.get('/feedback/month', function(req, res, next) {
    db.query("select count(*) as count, DATE(upload_start) as date from feedback " +
        "where upload_start BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW() group by DATE(upload_start)",
        { type: db.QueryTypes.SELECT})
    .then(data => {
        res.status(200).send({
            data: data
        })
    })
});

feedbackRouter.get('/feedback/year', function(req, res, next) {
    db.query("select count(*) as count,DATE(upload_start) as date from feedback " +
        "where upload_start BETWEEN date_sub(now(),interval 1 year) AND NOW() group by DATE(upload_start)",
        {type: db.QueryTypes.SELECT})
        .then(data => {
            res.status(200).send({
                data: data
            })
        })
});

feedbackRouter.get('/feedback/year/:customer', function(req, res, next) {
    db.query("select count(*) as count,DATE(upload_start) as date from feedback " +
        "where determined_customer = :customer AND " +
        "upload_start BETWEEN date_sub(now(),INTERVAL 1 year) AND NOW() group by DATE(upload_start)",
        {replacements: {customer: req.params.customer}, type: db.QueryTypes.SELECT})
        .then(data => {
            res.status(200).send({
                data: data
            })
        })
});

feedbackRouter.get('/feedback/year/license/:serial', function(req, res, next) {
    db.query("select count(*) as count,DATE(upload_start) as date from feedback " +
        "where fa_id IN (select fa_id from license where serial= :serial) AND " +
        "(upload_start BETWEEN date_sub(now(),INTERVAL 1 year) AND NOW()) " +
        "group by DATE(upload_start)",
        {replacements: {serial: req.params.serial}, type: db.QueryTypes.SELECT})
        .then(data => {
            res.status(200).send({
                data: data
            })
        })
});

module.exports = feedbackRouter;