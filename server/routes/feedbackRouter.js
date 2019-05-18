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
const db = require('../database');

const feedbackRouter = express.Router();

feedbackRouter.get('/feedback/all', function(req, res, next) {
    Feedback.findAll({
        where: {
            upload_start: {
                [Op.gte]: moment(req.query.from, 'DD.MM.YYYY').startOf('day'),
                [Op.lte]: moment(req.query.to, 'DD.MM.YYYY').endOf('day')
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
        ],
        order: [['upload_start', 'DESC']]
    })
    .then(data => {
        res.status(200).send({
            data: data
        })
    })
    .catch(next);
});

feedbackRouter.get('/feedback/:customer', function(req, res, next) {
    Feedback.findAll({
        where: {
            determined_customer: req.params.customer,
            upload_start: {
                [Op.gte]: moment(req.query.from, 'DD.MM.YYYY').startOf('day'),
                [Op.lte]: moment(req.query.to, 'DD.MM.YYYY').endOf('day')
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
        ],
        order: [['upload_start', 'DESC']]
    })
    .then(data => {
        res.status(200).send({
            data: data
        })
    })
    .catch(next)
});

feedbackRouter.get('/feedback/license/:serial', function(req, res, next) {
    Feedback.findAll({
        where: {
            upload_start: {
                [Op.gte]: moment(req.query.from, 'DD.MM.YYYY').startOf('day'),
                [Op.lte]: moment(req.query.to, 'DD.MM.YYYY').endOf('day')
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
        ],
        order: [['upload_start', 'DESC']]
    })
    .then(data => {
        res.status(200).send({
            data: data
        })
    })
    .catch(next)
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
    .catch(next)
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
        .catch(next)
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
        .catch(next)
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
        .catch(next)
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
        .catch(next)
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
        .catch(next)
});

feedbackRouter.get('/feedback/kernunversion', function(req, res, next) {

    db.query("SELECT count(*) AS count, DATE(upload_start) AS date " +
        "FROM feedback " +
        "WHERE fa_id IN (SELECT fa_id FROM license WHERE serial= :serial) AND " +
        "(upload_start BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND DATE_SUB(CURDATE(), INTERVAL -1 DAY)) " +
        "GROUP BY DATE(upload_start)",
        {replacements: {kernunVersion: req.query.kernunVersion, uploadStart: req.query.uploadStart}, type: db.QueryTypes.SELECT})
        .then(data => {
            res.status(200).send({
                data: data
            })
        })
        .catch(next)
});

feedbackRouter.get('/feedback/kernunvariant', function(req, res, next) {
    db.query("SELECT count(*) AS count, DATE(upload_start) AS date " +
        "FROM feedback " +
        "WHERE fa_id IN (SELECT fa_id FROM license WHERE serial= :serial) AND " +
        "(upload_start BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND DATE_SUB(CURDATE(), INTERVAL -1 DAY)) " +
        "GROUP BY DATE(upload_start)",
        {replacements: {kernun_variant: req.query.kernunVariant, uploadStart: req.query.uploadStart},
            type: db.QueryTypes.SELECT})
        .then(data => {
            res.status(200).send({
                data: data
            })
        })
        .catch(next)
});

feedbackRouter.get('/feedback/kcwfunction', function(req, res, next) {
    db.query("SELECT count(*) AS count, DATE(upload_start) AS date " +
        "FROM feedback " +
        "WHERE fa_id IN (SELECT fa_id FROM license WHERE serial= :serial) AND " +
        "(upload_start BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND DATE_SUB(CURDATE(), INTERVAL -1 DAY)) " +
        "GROUP BY DATE(upload_start)",
        {replacements: {kcwfunction: req.query.kcwFunction, uploadStart: req.query.uploadStart, value: req.query.value },
            type: db.QueryTypes.SELECT})
        .then(data => {
            res.status(200).send({
                data: data
            })
        })
        .catch(next)
});

feedbackRouter.get('/feedback/kcwauth', function(req, res, next) {
    db.query("SELECT count(*) AS count, DATE(upload_start) AS date " +
        "FROM feedback " +
        "WHERE fa_id IN (SELECT fa_id FROM license WHERE serial= :serial) AND " +
        "(upload_start BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND DATE_SUB(CURDATE(), INTERVAL -1 DAY)) " +
        "GROUP BY DATE(upload_start)",
        {replacements: {kcwAuth: req.query.kcwAuth, uploadStart: req.query.uploadStart},
            type: db.QueryTypes.SELECT})
        .then(data => {
            res.status(200).send({
                data: data
            })
        })
        .catch(next)
});

feedbackRouter.get('/feedback/all/processed', function(req, res, next) {
    db.query("SELECT count(*) AS count,DATE(processed) AS date " +
        "FROM feedback " +
        "WHERE processed BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND DATE_SUB(CURDATE(), INTERVAL -1 DAY) " +
        "GROUP by DATE(processed)",
        {type: db.QueryTypes.SELECT})
        .then(data => {
            res.status(200).send({
                data: data
            })
        })
        .catch(next)
});

module.exports = feedbackRouter;