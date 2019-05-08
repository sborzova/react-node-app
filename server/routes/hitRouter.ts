const Feedback = require('../models/feedback.ts');
const License = require('../models/license.ts');
const Device = require('../models/device.ts');
const Reporter = require('../models/reporter.ts');
const db = require('../database.ts');

const Sequelize = require('sequelize');
const express = require('express');
const moment = require('moment');
const underscore = require('underscore');

const hitRouter = express.Router();

hitRouter.get('/hits/week/:customer' ,function(req, res, next) {
    db.query("select feedback.fa_id, hits as count, date(upload_start) as date, hostid, hostname " +
        "from feedback left join device on feedback.fa_id = device.fa_id " +
        "where determined_customer = :customer AND " +
        "upload_start BETWEEN DATE_SUB(NOW(), INTERVAL 6 DAY) AND NOW() " +
        "order by DATE(upload_start)",
        { replacements: {customer: req.params.customer }, type: db.QueryTypes.SELECT})
        .then(data => {
            let groups = underscore.groupBy(data, function(object) {
                return object.hostid;
            });
            res.status(200).send({
                data: groups
            })
        })
});

hitRouter.get('/hits/month/:customer' ,function(req, res, next) {
    db.query("select feedback.fa_id, hits as count, date(upload_start) as date, hostid, hostname " +
        "from feedback left join device on feedback.fa_id = device.fa_id " +
        "where determined_customer = :customer AND " +
        "upload_start BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW() " +
        "order by DATE(upload_start)",
        { replacements: {customer: req.params.customer }, type: db.QueryTypes.SELECT})
        .then(data => {
            let groups = underscore.groupBy(data, function(object) {
                return object.hostid;
            });
            res.status(200).send({
                data: groups
            })
        })
});

hitRouter.get('/hits/year/:customer' ,function(req, res, next) {
    db.query("select feedback.fa_id, hits as count, date(upload_start) as date, hostid, hostname " +
        "from feedback left join device on feedback.fa_id = device.fa_id " +
        "where determined_customer = :customer AND " +
        "upload_start BETWEEN DATE_SUB(NOW(), INTERVAL 1 YEAR) AND NOW() " +
        "order by DATE(upload_start)",
        { replacements: {customer: req.params.customer }, type: db.QueryTypes.SELECT})
        .then(data => {
            let groups = underscore.groupBy(data, function(object) {
                return object.hostid;
            });
            res.status(200).send({
                data: groups
            })
        })
});

module.exports = hitRouter;