const db = require('../database');

const express = require('express');
const underscore = require('underscore');

const statisticRouter = express.Router();

statisticRouter.get('/statistic/kernun' ,function(req, res, next) {
    db.query("SELECT kernun_variant, kernun_version, expiration " +
        "FROM  " +
        " (SELECT a.fa_id, determined_customer, expiration   " +
        " FROM   " +
        "  (SELECT fa_id, determined_customer, upload_start    " +
        "  FROM feedback WHERE DATE(upload_start) = :date) AS a   " +
        "   LEFT JOIN license ON a.fa_id = license.fa_id ) AS b  " +
        "   LEFT JOIN device ON b.fa_id = device.fa_id ",
        { replacements: {date: req.query.date }, type: db.QueryTypes.SELECT})
        .then(data => {
            let sales = [];
            let rental = [];
            data.forEach(data => {
                if (data.expiration == 'unlimited'){
                    sales.push(data);
                }else {
                    rental.push(data);
                }
            });

            let rentalGroups = underscore.groupBy(rental, function(object) {
                return object.kernun_variant + '#' + object.kernun_version;
            });

            let salesGroups = underscore.groupBy(sales, function(object) {
                return object.kernun_variant + '#' + object.kernun_version;
            });

            let rentalGroupsObjects = underscore.map(rentalGroups, function(group){
                return {
                    kernun_variant: group[0].kernun_variant,
                    kernun_version: group[0].kernun_version,
                    count: group.length
                }
            });

            let salesGroupsObjects = underscore.map(salesGroups, function(group){
                return {
                    kernun_variant: group[0].kernun_variant,
                    kernun_version: group[0].kernun_version,
                    count: group.length
                }
            });

            let rentalGroupsByVersion = underscore.groupBy(rentalGroupsObjects, function (object) {
                return object.kernun_variant;
            });

            let salesGroupsByVersion = underscore.groupBy(salesGroupsObjects, function (object) {
                return object.kernun_variant;
            });

            res.status(200).send({
                data: {rental: rentalGroupsByVersion, sales: salesGroupsByVersion}
            })
        })
        .catch(next)
});

statisticRouter.get('/statistic/kcw' ,function(req, res, next) {
    db.query("SELECT kcw_function.* FROM " +
        "(SELECT a.fa_id, determined_customer  " +
        "FROM  " +
        "(SELECT fa_id, determined_customer FROM feedback WHERE DATE(upload_start) = :date) AS a " +
        "LEFT JOIN device ON a.fa_id = device.fa_id " +
        "WHERE kernun_variant = 'kernun_clear_web') as b " +
        "LEFT JOIN kcw_function on kcw_function.fa_id = b.fa_id",
        { replacements: {date: req.query.date }, type: db.QueryTypes.SELECT})
        .then(data => {
            res.status(200).send({
                data: data
            })
        })
        .catch(next)
});

module.exports = statisticRouter;