const Sequelize = require('sequelize');
const express = require('express');
const moment = require('moment');
const underscore = require('underscore');

const db = require('../database.ts');

const hitRouter = express.Router();

hitRouter.get('/hits/week/:customer' ,function(req, res, next) {
    db.query("SELECT feedback.fa_id, hits AS count, DATE(upload_start) AS date, hostid, hostname " +
        "FROM feedback LEFT JOIN device ON feedback.fa_id = device.fa_id " +
        "WHERE determined_customer = :customer AND " +
        "upload_start BETWEEN DATE_SUB(NOW(), INTERVAL 6 DAY) AND NOW() " +
        "ORDER BY DATE(upload_start)",
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
    db.query("SELECT feedback.fa_id, hits AS count, DATE(upload_start) AS date, hostid, hostname " +
        "FROM feedback left join device ON feedback.fa_id = device.fa_id " +
        "WHERE determined_customer = :customer AND " +
        "upload_start BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW() " +
        "ORDER BY DATE(upload_start)",
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
    db.query("SELECT feedback.fa_id, hits AS count, DATE(upload_start) AS date, hostid, hostname " +
        "FROM feedback LEFT JOIN device ON feedback.fa_id = device.fa_id " +
        "WHERE determined_customer = :customer AND " +
        "upload_start BETWEEN DATE_SUB(NOW(), INTERVAL 1 YEAR) AND NOW() " +
        "ORDER BY DATE(upload_start)",
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