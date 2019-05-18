const express = require('express');
const utils = require('../utils/utils');

const db = require('../database');

const hitRouter = express.Router();

hitRouter.get('/hits/week/:customer' ,function(req, res, next) {
    db.query("SELECT feedback.fa_id, hits AS count, DATE(upload_start) AS date, hostid, hostname " +
        "FROM feedback LEFT JOIN device ON feedback.fa_id = device.fa_id " +
        "WHERE determined_customer = :customer AND " +
        "upload_start BETWEEN DATE_SUB(NOW(), INTERVAL 6 DAY) AND NOW() " +
        "ORDER BY DATE(upload_start)",
        { replacements: {customer: req.params.customer }, type: db.QueryTypes.SELECT})
        .then(data => {
            let groups = utils.groupByHostid(data);
            res.status(200).send({
                data: groups
            })
        })
        .catch(next)
});

hitRouter.get('/hits/month/:customer' ,function(req, res, next) {
    db.query("SELECT feedback.fa_id, hits AS count, DATE(upload_start) AS date, hostid, hostname " +
        "FROM feedback left join device ON feedback.fa_id = device.fa_id " +
        "WHERE determined_customer = :customer AND " +
        "upload_start BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW() " +
        "ORDER BY DATE(upload_start)",
        { replacements: {customer: req.params.customer }, type: db.QueryTypes.SELECT})
        .then(data => {
            let groups = utils.groupByHostid(data);
            res.status(200).send({
                data: groups
            })
        })
        .catch(next)
});

hitRouter.get('/hits/year/:customer' ,function(req, res, next) {
    db.query("SELECT feedback.fa_id, hits AS count, DATE(upload_start) AS date, hostid, hostname " +
        "FROM feedback LEFT JOIN device ON feedback.fa_id = device.fa_id " +
        "WHERE determined_customer = :customer AND " +
        "upload_start BETWEEN DATE_SUB(NOW(), INTERVAL 1 YEAR) AND NOW() " +
        "ORDER BY DATE(upload_start)",
        { replacements: {customer: req.params.customer }, type: db.QueryTypes.SELECT})
        .then(data => {
            let groups = utils.groupByHostid(data);
            res.status(200).send({
                data: groups
            })
        })
        .catch(next)
});

module.exports = hitRouter;