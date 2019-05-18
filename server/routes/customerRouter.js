const utils = require('../utils/utils');
const express = require('express');
const db = require('../database');

const customerRouter = express.Router();

customerRouter.get('/customers' ,function(req, res, next) {
    db.query("SELECT a.fa_id, a.determined_customer, a.upload_start, a.serial, expiration, upgrade, ident " +
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
        " WHERE feedback.upload_start BETWEEN DATE_SUB(DATE(NOW()),INTERVAL 1 month) AND DATE_SUB(CURDATE(), INTERVAL -1 DAY)  " +
        " GROUP BY license.serial) " +
        "AS b " +
        "ON a.upload_start = b.upload_start AND a.serial = b.serial " +
        "ORDER BY determined_customer", { type: db.QueryTypes.SELECT}
    ).then(data => {
        let customers = utils.processDataCustomers(data);
        res.status(200).send({
            data: customers
        })
    })
    .catch(next)
});

module.exports = customerRouter;