const Feedback = require('../models/feedback.ts');
const License = require('../models/license.ts');
const Device = require('../models/device.ts');
const DeviceStatus = require('../models/deviceStatus.ts');
const Reporter = require('../models/reporter.ts');
const KcwFunction = require('../models/kcwFunction.ts');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const express = require('express');
const moment = require('moment');
const underscore = require('underscore');
const db = require('../database.ts');

const router = express.Router();

router.post('/feedback', function(req, res, next) {
    Feedback.findAll({
        where: {
            upload_start: {
                [Op.gte]: moment(req.body.from, 'DD.MM.YYYY').startOf('day'),
                [Op.lte]: moment(req.body.to, 'DD.MM.YYYY').endOf("day"),
            },
        },
        include: [{
            model: License,
        },{
            model: Device
        }]
    })
    .then(data => {
        res.status(200).send({
            data: data
        })
    }).catch((e) => console.log(e))
});

router.post('/feedback/:customer', function(req, res, next) {
    Feedback.findAll({
        where: {
            determined_customer: req.params.customer,
            upload_start: {
                [Op.gte]: moment(req.body.from, 'DD.MM.YYYY').startOf('day'),
                [Op.lte]: moment(req.body.to, 'DD.MM.YYYY').endOf('day'),
            },
        },
        include: [{
            model: License,
        },{
            model: Device
        }]
    })
        .then(data => {
            res.status(200).send({
                data: data
            })
        }).catch((e) => console.log(e))
});

router.get('/customers' ,function(req, res, next) {
    // TODO nebude asi treba, teraz bere licenses
    // Feedback.findAll({
    //     where: {
    //         // Set condition about date for looking licenses !!!!
    //         upload_start: {
    //             [Op.gte]: moment(new Date()).subtract(2, "months").format(),
    //         },
    //     },
    //     include: [{
    //         model: License
    //     },{
    //         model: Device
    //     }
    //     ],
    //     group: ['license.serial'],
    //     having: Sequelize.fn('max', Sequelize.col('upload_start'))
    // })
    // db.query("SELECT fa_id, determined_customer, MAX(upload_start) as upload_start, license FROM feedback_arrival WHERE determined_customer IS NOT NULL GROUP BY determined_customer",
    //     { type: db.QueryTypes.SELECT})
    //     .then(users => {
    //         users.forEach(u => {
    //             if (u.license !=null){
    //                 u.license = u.license.match('expiration: (.*)\\nupgrade')[1];
    //             }else {
    //                 u.license = "";
    //             }
    //             let date = new Date(u.upload_start);
    //             date.setDate(date.getDate() + NUMBER_OF_DAYS);
    //             let expiration = new Date(u.license);
    //             if (date <= new Date() && expiration >= new Date()){
    //                 u.info = "possible problem"
    //             }
    //         });
    //         res.status(200).send({
    //             data: users
    //         })
    //     }).catch((e) => console.log(e))
});

router.get('/licenses' ,function(req, res, next) {
    Feedback.findAll({
        where: {
            upload_start: {
                [Op.gte]: moment().subtract(2, 'months').format(),
                [Op.lte]: moment().format(),
            },
        },
        include: [{
            model: License
        },{
            model: Device
        }
        ],
        group: ['license.serial'],
        having: Sequelize.fn('max', Sequelize.col('upload_start'))
    }).then(data => {
        data.forEach(d => {
            if (d.license != null && d.license.expiration){
                if (d.license.expiration === 'unlimited'){
                     d.license.saleType = 'sale'
                }else {
                    if (d.license.expiration.length > 0)
                        d.license.saleType = 'rental'
                }
            }
            if (d.determined_customer.match('EDU')){
                d.license.licenseType = 'edu';
            }else if (d.determined_customer.match('TEST')){
                d.license.licenseType = 'test';
            }else if(d.determined_customer.match('NFR')){
                d.license.licenseType = 'nfr';
            }
        });
        res.status(200).send({
            data: data
        })
    }).catch((e) => console.log(e))
});


router.get('/devices/:customer' ,function(req, res, next) {
    Feedback.findAll({
        where: {
            determined_customer: req.params.customer,
            upload_start: {
                [Op.gte]: moment().startOf('day').subtract(1,'year'),
                [Op.lte]: moment().startOf('day')
            },
        },
        //attributes:['fa_id', 'determined_customer'],
        include: [{
            model: DeviceStatus,
        },{
            model: Device
        }]
    }).then(data => {
            let groups = underscore.groupBy(data, function(object) {
                return object.device.hostid;
            });

            res.status(200).send({
                data: groups
            })
    }).catch((e) => console.log(e))
});

router.get('/feedback/detail/:id', function(req, res, next){
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

router.get('/feedback/week' ,function(req, res, next) {
    db.query("select count(*) as count, DATE(upload_start) as date from feedback " +
        "where upload_start BETWEEN DATE_SUB(NOW(), INTERVAL 6 DAY) AND NOW() group by DATE(upload_start)",
        { type: db.QueryTypes.SELECT})
    .then(data => {
        res.status(200).send({
            data: data
        })
    })
});

router.get('/feedback/month' ,function(req, res, next) {
    db.query("select count(*) as count, DATE(upload_start) as date from feedback " +
        "where upload_start BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW() group by DATE(upload_start)",
        { type: db.QueryTypes.SELECT})
    .then(data => {
        res.status(200).send({
            data: data
        })
    })
});

router.get('/feedback/year' ,function(req, res, next) {
    db.query("select count(*) as count,DATE(upload_start) as date from feedback " +
        "where upload_start BETWEEN date_sub(now(),interval 1 year) AND NOW() group by DATE(upload_start)",
        {type: db.QueryTypes.SELECT})
        .then(data => {
            res.status(200).send({
                data: data
            })
        })
});

router.get('/feedback/year/:customer' ,function(req, res, next) {
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

router.get('/hits/week/:customer' ,function(req, res, next) {
    db.query("select sum(hits) as count, date(upload_start) as date from feedback " +
        "where determined_customer = :customer AND " +
        "upload_start BETWEEN DATE_SUB(NOW(), INTERVAL 6 DAY) AND NOW() group by DATE(upload_start);",
        { replacements: {customer: req.params.customer }, type: db.QueryTypes.SELECT})
        .then(data => {
            res.status(200).send({
                data: data
            })
        })
});

router.get('/hits/month/:customer' ,function(req, res, next) {
    db.query("select sum(hits) as count, date(upload_start) as date from feedback " +
        "where determined_customer = :customer AND " +
        "upload_start BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW() group by DATE(upload_start);",
        { replacements: {customer: req.params.customer }, type: db.QueryTypes.SELECT})
        .then(data => {
            res.status(200).send({
                data: data
            })
        })
});

router.get('/hits/year/:customer' ,function(req, res, next) {
    db.query("select sum(hits) as count, date(upload_start) as date from feedback " +
        "where determined_customer = :customer AND " +
        "upload_start BETWEEN DATE_SUB(NOW(), INTERVAL 1 YEAR) AND NOW() group by DATE(upload_start)",
        { replacements: {customer: req.params.customer }, type: db.QueryTypes.SELECT})
        .then(data => {
            res.status(200).send({
                data: data
            })
        })
});

module.exports = router;