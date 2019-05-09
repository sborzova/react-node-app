const Sequelize = require('sequelize');
const express = require('express');
const moment = require('moment');
const underscore = require('underscore');

const db = require('../database.ts');

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
        data = [].concat.apply([], data);
        let groups = underscore.groupBy(data, function(object) {
            return object.determined_customer;
        });
        const customersIds = Object.keys(groups);
        let customers = [];
        customersIds.forEach(customerId => {
            const feedbacks = groups[customerId];
            feedbacks.forEach(feedback =>{
                let color = 'grey';
                if (moment(feedback.upgrade).isAfter(moment())){
                    if (moment(feedback.upload_start).format('L') == moment().format('L')){
                        color = 'green';
                    }else{
                        color = 'red';
                    }

                }else if(!moment(feedback.upgrade).isAfter(moment())){
                    if (moment(feedback.upload_start).format('L') == moment().format('L')){
                        color = 'blue';
                    }else{
                        color = 'yellow';
                    }
                }

                feedback.color = color;
            });
            customers.push({
                determined_customer: customerId,
                feedbacks: feedbacks,
            });
        });

        res.status(200).send({
            data: customers
        })
    }).catch((e) => console.log(e))
});

module.exports = customerRouter;