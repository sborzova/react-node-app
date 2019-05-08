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

// router.get('/feedback', function(req, res, next) {
//     Feedback.findAll({
//         where: {
//             upload_start: {
//                 [Op.gte]: moment(req.query.from, 'DD.MM.YYYY').startOf('day'),
//                 [Op.lte]: moment(req.query.to, 'DD.MM.YYYY').endOf("day"),
//             },
//         },
//         include: [{
//             model: License,
//         },{
//             model: Device,
//         },{
//             model: DeviceStatus
//         },{
//             model: Reporter
//         }
//         ]
//     })
//     .then(data => {
//         data.forEach(d => {
//             let color = [];
//             if (d.license && moment(d.license.expiration).isBefore(moment())){
//                 color.push('red');
//                 let devcount = parseInt(d.license.devcount);
//                 if (devcount && d.reporter){
//                     if (devcount > d.reporter.reporter_users){
//                         color.push('blue');
//                     }
//                     if (devcount > d.reporter.reporter_clients){
//                         color.push('pink')
//                     }
//                 }
//             }
//             if (d.deviceStatus){
//                 if (!d.deviceStatus.uptime.includes('day')){
//                     color.push('black');
//                 }
//                 if (d.deviceStatus.n_panics != 0){
//                     color.push('yellow');
//                 }
//                 if (d.deviceStatus.n_aborts != 0){
//                     color.push('orange');
//                 }
//                 if (d.deviceStatus.core_dumps && d.deviceStatus.core_dumps.length > 0){
//                     color.push('green');
//                 }
//             }
//
//             d.color = color;
//         });
//         res.status(200).send({
//             data: data
//         })
//     }).catch((e) => console.log(e))
// });
//
// router.get('/feedback/:customer', function(req, res, next) {
//     Feedback.findAll({
//         where: {
//             determined_customer: req.params.customer,
//             upload_start: {
//                 [Op.gte]: moment(req.query.from, 'DD.MM.YYYY').startOf('day'),
//                 [Op.lte]: moment(req.query.to, 'DD.MM.YYYY').endOf('day'),
//             },
//         },
//         include: [{
//             model: License,
//         },{
//             model: Device,
//         },{
//             model: DeviceStatus
//         },{
//             model: Reporter
//         }
//         ]
//     })
//         .then(data => {
//             data.forEach(d => {
//                 let color = [];
//                 if (d.license && moment(d.license.expiration).isBefore(moment())){
//                     color.push('red');
//                     let devcount = parseInt(d.license.devcount);
//                     if (devcount && d.reporter){
//                         if (devcount > d.reporter.reporter_users){
//                             color.push('blue');
//                         }
//                         if (devcount > d.reporter.reporter_clients){
//                             color.push('pink')
//                         }
//                     }
//                 }
//                 if (d.deviceStatus){
//                     if (!d.deviceStatus.uptime.includes('day')){
//                         color.push('black');
//                     }
//                     if (d.deviceStatus.n_panics != 0){
//                         color.push('yellow');
//                     }
//                     if (d.deviceStatus.n_aborts != 0){
//                         color.push('orange');
//                     }
//                     if (d.deviceStatus.core_dumps.length > 0){
//                         color.push('green');
//                     }
//                 }
//
//                 d.color = color;
//             });
//             res.status(200).send({
//                 data: data
//             })
//         }).catch((e) => console.log(e))
// });
//
// router.get('/feedback/license/:serial', function(req, res, next) {
//     Feedback.findAll({
//         where: {
//             upload_start: {
//                 [Op.gte]: moment(req.query.from, 'DD.MM.YYYY').startOf('day'),
//                 [Op.lte]: moment(req.query.to, 'DD.MM.YYYY').endOf('day'),
//             },
//             '$License.serial$' : req.params.serial
//
//         },
//         include: [{
//             model: License,
//         },{
//             model: Device,
//         },{
//             model: DeviceStatus
//         },{
//             model: Reporter
//         }
//         ]
//     })
//         .then(data => {
//
//             data.forEach(d => {
//                 let color = [];
//                 if (d.license && moment(d.license.expiration).isBefore(moment())){
//                     color.push('red');
//                     let devcount = parseInt(d.license.devcount);
//                     if (devcount && d.reporter){
//                         if (devcount > d.reporter.reporter_users){
//                             color.push('blue');
//                         }
//                         if (devcount > d.reporter.reporter_clients){
//                             color.push('pink')
//                         }
//                     }
//                 }
//                 if (d.deviceStatus){
//                     if (!d.deviceStatus.uptime.includes('day')){
//                         color.push('black');
//                     }
//                     if (d.deviceStatus.n_panics != 0){
//                         color.push('yellow');
//                     }
//                     if (d.deviceStatus.n_aborts != 0){
//                         color.push('orange');
//                     }
//                     if (d.deviceStatus.core_dumps.length > 0){
//                         color.push('green');
//                     }
//                 }
//
//                 d.color = color;
//             });
//             res.status(200).send({
//                 data: data
//             })
//         }).catch((e) => console.log(e))
// });

// router.get('/customers' ,function(req, res, next) {
//     Feedback.findAll({
//         where: {
//             upload_start: {
//                 [Op.gte]: moment().subtract(1, 'month').format(),
//                 [Op.lte]: moment().format(),
//             },
//         },
//         attributes: ['determined_customer', 'fa_id',
//             Sequelize.fn('max', Sequelize.col('feedback.upload_start')), 'upload_start'],
//         include: [{
//             model: License
//         },{
//             model: Device
//         }
//         ],
//         group: ['license.serial', 'determined_customer'],
//         order: [
//             ['determined_customer', 'ASC']
//         ]
//     }).then(data => {
//         let groups = underscore.groupBy(data, function(object) {
//             return object.determined_customer;
//         });
//         const customersIds = Object.keys(groups);
//         let customers = [];
//         customersIds.forEach(customerId => {
//             const feedbacks = groups[customerId];
//             feedbacks.forEach(feedback =>{
//                 let color = 'grey';
//                 if (feedback.license &&
//                     moment(feedback.license.upgrade).isAfter(moment())){
//                     if (moment(feedback.upload_start).format('L') == moment().format('L')){
//                         color = 'green';
//                     }else{
//                         color = 'red';
//                     }
//
//                 }else if(feedback.license && !moment(feedback.license.upgrade).isAfter(moment())){
//                     if (moment(feedback.upload_start).format('L') == moment().format('L')){
//                         color = 'blue';
//                     }else{
//                         color = 'yellow';
//                     }
//                 }
//
//                 feedback.color = color;
//             });
//             customers.push({
//                 determined_customer: customerId,
//                 feedbacks: feedbacks,
//             });
//         });
//
//         res.status(200).send({
//             data: customers
//         })
//     }).catch((e) => console.log(e))
//
//
//     // TODO nebude asi treba, teraz bere licenses
//     // Feedback.findAll({
//     //     where: {
//     //         // Set condition about date for looking licenses !!!!
//     //         upload_start: {
//     //             [Op.gte]: moment(new Date()).subtract(2, "months").format(),
//     //         },
//     //     },
//     //     include: [{
//     //         model: LicenseDetail
//     //     },{
//     //         model: Device
//     //     }
//     //     ],
//     //     group: ['license.serial'],
//     //     having: Sequelize.fn('max', Sequelize.col('upload_start'))
//     // })
//     // db.query("SELECT fa_id, determined_customer, MAX(upload_start) as upload_start, license FROM feedback_arrival WHERE determined_customer IS NOT NULL GROUP BY determined_customer",
//     //     { type: db.QueryTypes.SELECT})
//     //     .then(users => {
//     //         users.forEach(u => {
//     //             if (u.license !=null){
//     //                 u.license = u.license.match('expiration: (.*)\\nupgrade')[1];
//     //             }else {
//     //                 u.license = "";
//     //             }
//     //             let date = new Date(u.upload_start);
//     //             date.setDate(date.getDate() + NUMBER_OF_DAYS);
//     //             let expiration = new Date(u.license);
//     //             if (date <= new Date() && expiration >= new Date()){
//     //                 u.info = "possible problem"
//     //             }
//     //         });
//     //         res.status(200).send({
//     //             data: users
//     //         })
//     //     }).catch((e) => console.log(e))
// });

// router.get('/licenses' ,function(req, res, next) {
//     Feedback.findAll({
//         where: {
//             upload_start: {
//                 [Op.gte]: moment().subtract(1, 'month').format(),
//                 [Op.lte]: moment().format(),
//             },
//         },
//         attributes: ['determined_customer', 'fa_id',
//             Sequelize.fn('max', Sequelize.col('feedback.upload_start')), 'upload_start'],
//         include: [{
//             model: License
//         },{
//             model: Device
//         }
//         ],
//         group: ['license.serial', 'determined_customer'],
//         having: Sequelize.fn('max', Sequelize.col('upload_start')),
//         order: [
//             [License, 'upgrade', 'DESC'],
//         ]
//     }).then(data => {
//         data.forEach(d => {
//             if (d.license && d.license.expiration){
//                 if (d.license.expiration === 'unlimited'){
//                      d.license.saleType = 'sale'
//                 }else {
//                     if (d.license.expiration.length > 0)
//                         d.license.saleType = 'rental'
//                 }
//             }
//             if (d.determined_customer.match('EDU')){
//                 d.license.licenseType = 'edu';
//             }else if (d.determined_customer.match('TEST')){
//                 d.license.licenseType = 'test';
//             }else if(d.determined_customer.match('NFR')){
//                 d.license.licenseType = 'nfr';
//             }
//         });
//         res.status(200).send({
//             data: data
//         })
//     }).catch((e) => console.log(e))
// });
//
// router.get('/license/detail/:serial' ,function(req, res, next) {
//     Feedback.findOne({
//         where: {
//             upload_start: {
//                 [Op.gte]: moment().subtract(1, 'month').format(),
//                 [Op.lte]: moment().format(),
//             },
//             '$License.serial$' : req.params.serial
//         },
//         include: [{
//             model: License
//         },{
//             model: Device
//         }
//         ],
//         order: [
//             [Sequelize.fn('max', Sequelize.col('license.upgrade')), 'DESC'],
//         ]
//     }).then(d => {
//         // data.forEach(d => {
//             if (d.license && d.license.expiration){
//                 if (d.license.expiration === 'unlimited'){
//                     d.license.saleType = 'sale'
//                 }else {
//                     if (d.license.expiration.length > 0)
//                         d.license.saleType = 'rental'
//                 }
//             }
//             if (d.determined_customer.match('EDU')){
//                 d.license.licenseType = 'edu';
//             }else if (d.determined_customer.match('TEST')){
//                 d.license.licenseType = 'test';
//             }else if(d.determined_customer.match('NFR')){
//                 d.license.licenseType = 'nfr';
//             }
//         // });
//         res.status(200).send({
//             data: d
//         })
//     }).catch((e) => console.log(e))
// });

router.get('/devices/:customer' ,function(req, res, next) {
    Feedback.findAll({
        where: {
            determined_customer: req.params.customer,
            upload_start: {
                [Op.gte]: moment().startOf('day').subtract(1,'year'),
                [Op.lte]: moment().startOf('day')
            },
        },
        attributes:['upload_start'],
        include: [{
            model: DeviceStatus,
            attributes: ['uptime']
        },{
            model: Device,
            attributes: ['hostname', 'hostid']
        },{
            model: License,
            attributes: ['ident']
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

// router.get('/feedback/detail/:id', function(req, res, next){
//     Feedback.findAll({
//         where: {
//             fa_id: req.params.id
//         },
//         include: [{
//             model: License
//         },{
//             model: Device
//         },{
//             model: DeviceStatus
//         },{
//             model: Reporter
//         },{
//             model: KcwFunction
//         }]
//     })
//     .then(data => {
//         res.status(200).send({
//             data: data
//         })
//     })
// });
//
// router.get('/feedback/week' ,function(req, res, next) {
//     console.log('tu');
//     db.query("select count(*) as count, DATE(upload_start) as date from feedback " +
//         "where upload_start BETWEEN DATE_SUB(NOW(), INTERVAL 6 DAY) AND NOW() group by DATE(upload_start)",
//         { type: db.QueryTypes.SELECT})
//     .then(data => {
//         res.status(200).send({
//             data: data
//         })
//     })
// });
//
// router.get('/feedback/month', function(req, res, next) {
//     db.query("select count(*) as count, DATE(upload_start) as date from feedback " +
//         "where upload_start BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW() group by DATE(upload_start)",
//         { type: db.QueryTypes.SELECT})
//     .then(data => {
//         res.status(200).send({
//             data: data
//         })
//     })
// });
//
// router.get('/feedback/year', function(req, res, next) {
//     db.query("select count(*) as count,DATE(upload_start) as date from feedback " +
//         "where upload_start BETWEEN date_sub(now(),interval 1 year) AND NOW() group by DATE(upload_start)",
//         {type: db.QueryTypes.SELECT})
//         .then(data => {
//             res.status(200).send({
//                 data: data
//             })
//         })
// });
//
// router.get('/feedback/year/:customer', function(req, res, next) {
//     db.query("select count(*) as count,DATE(upload_start) as date from feedback " +
//         "where determined_customer = :customer AND " +
//         "upload_start BETWEEN date_sub(now(),INTERVAL 1 year) AND NOW() group by DATE(upload_start)",
//         {replacements: {customer: req.params.customer}, type: db.QueryTypes.SELECT})
//         .then(data => {
//             res.status(200).send({
//                 data: data
//             })
//         })
// });
//
// router.get('/feedback/year/license/:serial', function(req, res, next) {
//     db.query("select count(*) as count,DATE(upload_start) as date from feedback " +
//         "where fa_id IN (select fa_id from license where serial= :serial) AND " +
//         "(upload_start BETWEEN date_sub(now(),INTERVAL 1 year) AND NOW()) " +
//         "group by DATE(upload_start)",
//         {replacements: {serial: req.params.serial}, type: db.QueryTypes.SELECT})
//         .then(data => {
//             res.status(200).send({
//                 data: data
//             })
//         })
// });

// router.get('/hits/week/:customer' ,function(req, res, next) {
//     db.query("select feedback.fa_id, hits as count, date(upload_start) as date, hostid, hostname " +
//         "from feedback left join device on feedback.fa_id = device.fa_id " +
//         "where determined_customer = :customer AND " +
//         "upload_start BETWEEN DATE_SUB(NOW(), INTERVAL 6 DAY) AND NOW() " +
//         "order by DATE(upload_start)",
//         { replacements: {customer: req.params.customer }, type: db.QueryTypes.SELECT})
//         .then(data => {
//             let groups = underscore.groupBy(data, function(object) {
//                 return object.hostid;
//             });
//             res.status(200).send({
//                 data: groups
//             })
//         })
// });
//
// router.get('/hits/month/:customer' ,function(req, res, next) {
//     db.query("select feedback.fa_id, hits as count, date(upload_start) as date, hostid, hostname " +
//         "from feedback left join device on feedback.fa_id = device.fa_id " +
//         "where determined_customer = :customer AND " +
//         "upload_start BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW() " +
//         "order by DATE(upload_start)",
//         { replacements: {customer: req.params.customer }, type: db.QueryTypes.SELECT})
//         .then(data => {
//             let groups = underscore.groupBy(data, function(object) {
//                 return object.hostid;
//             });
//             res.status(200).send({
//                 data: groups
//             })
//         })
// });
//
// router.get('/hits/year/:customer' ,function(req, res, next) {
//     db.query("select feedback.fa_id, hits as count, date(upload_start) as date, hostid, hostname " +
//         "from feedback left join device on feedback.fa_id = device.fa_id " +
//         "where determined_customer = :customer AND " +
//         "upload_start BETWEEN DATE_SUB(NOW(), INTERVAL 1 YEAR) AND NOW() " +
//         "order by DATE(upload_start)",
//         { replacements: {customer: req.params.customer }, type: db.QueryTypes.SELECT})
//         .then(data => {
//             let groups = underscore.groupBy(data, function(object) {
//                 return object.hostid;
//             });
//             res.status(200).send({
//                 data: groups
//             })
//         })
// });

router.get('/domains/week/:customer' ,function(req, res, next) {
    db.query("select feedback.fa_id, domains as count, date(upload_start) as date, hostid, hostname " +
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

router.get('/domains/month/:customer' ,function(req, res, next) {
    db.query("select feedback.fa_id, domains as count, date(upload_start) as date, hostid, hostname " +
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

router.get('/domains/year/:customer' ,function(req, res, next) {
    db.query("select feedback.fa_id, domains as count, date(upload_start) as date, hostid, hostname " +
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

module.exports = router;