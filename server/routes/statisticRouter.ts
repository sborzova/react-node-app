const db = require('../database.ts');

const Sequelize = require('sequelize');
const express = require('express');
const moment = require('moment');
const underscore = require('underscore');

const statisticRouter = express.Router();

statisticRouter.get('/statistic/kernun' ,function(req, res, next) {
    db.query("SELECT count(*) AS count, kernun_variant, kernun_version  " +
        "FROM " +
        "(SELECT a.fa_id, determined_customer  " +
        "FROM  " +
        "(SELECT fa_id, determined_customer, upload_start  " +
        "  FROM feedback WHERE DATE(upload_start) = :date) AS a  " +
        " LEFT JOIN license ON a.fa_id = license.fa_id " +
        " WHERE DATE(upload_start) < DATE(upgrade)) AS b " +
        "LEFT JOIN device ON b.fa_id = device.fa_id " +
        "GROUP BY kernun_variant, kernun_version",
        { replacements: {date: req.query.date }, type: db.QueryTypes.SELECT})
        .then(data => {
            let groups = underscore.groupBy(data, function(object) {
                return object.kernun_variant;
            });
            res.status(200).send({
                data: groups
            })
        })
});

statisticRouter.get('/statistic/kcw' ,function(req, res, next) {
    db.query("SELECT kcw_function.* FROM (SELECT b.fa_id FROM (SELECT a.fa_id, determined_customer  " +
        "FROM (SELECT fa_id, determined_customer, upload_start  " +
        " FROM feedback WHERE DATE(upload_start) = :date) AS a  " +
        " LEFT JOIN license ON a.fa_id = license.fa_id " +
        " WHERE DATE(upload_start) < DATE(upgrade)) AS b " +
        "LEFT JOIN device ON b.fa_id = device.fa_id " +
        "WHERE kernun_variant = 'kernun_clear_web') AS c " +
        "LEFT JOIN kcw_function on kcw_function.fa_id = c.fa_id",
        { replacements: {date: req.query.date }, type: db.QueryTypes.SELECT})
        .then(data => {

            res.status(200).send({
                data: data
            })
        })
});

module.exports = statisticRouter;