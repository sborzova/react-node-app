const Sequelize = require('sequelize');
const express = require('express');
const moment = require('moment');
const underscore = require('underscore');

const db = require('../database.ts');

const domainRouter = express.Router();

domainRouter.get('/domains/week/:customer' ,function(req, res) {
    db.query("SELECT feedback.fa_id, domains AS count, date(upload_start) AS date, hostid, hostname " +
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

domainRouter.get('/domains/month/:customer' ,function(req, res, next) {
    db.query("SELECT feedback.fa_id, domains AS count, date(upload_start) AS date, hostid, hostname " +
        "FROM feedback LEFT JOIN device ON feedback.fa_id = device.fa_id " +
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

domainRouter.get('/domains/year/:customer' ,function(req, res, next) {
    db.query("SELECT feedback.fa_id, domains AS count, date(upload_start) AS date, hostid, hostname " +
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

module.exports = domainRouter;