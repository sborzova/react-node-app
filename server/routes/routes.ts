const express = require('express');
const db = require('../database.ts');

const router = express.Router();

const NUMBER_OF_DAYS = 7;

router.post('/feedback', function(req, res, next) {
    const from = req.body.from;
    const to = req.body.to;
    console.log(from);
    console.log(to);
    db.query("SELECT * FROM `feedback_arrival` where license is not null and (upload_start between :from and date_add(:to, interval 1 day));",
        { replacements: { from: from, to: to}, type: db.QueryTypes.SELECT})
    .then(data => {
        res.status(200).send({
            data: data
        })
    }).catch((e) => console.log(e))
});

router.get('/customers' ,function(req, res, next) {
    db.query("SELECT fa_id, determined_customer, MAX(upload_start) as upload_start, license FROM feedback_arrival WHERE determined_customer IS NOT NULL GROUP BY determined_customer",
        { type: db.QueryTypes.SELECT})
        .then(users => {
            users.forEach(u => {
                if (u.license !=null){
                    u.license = u.license.match('expiration: (.*)\\nupgrade')[1];
                }else {
                    u.license = "";
                }
                let date = new Date(u.upload_start);
                date.setDate(date.getDate() + NUMBER_OF_DAYS);
                let expiration = new Date(u.license);
                if (date <= new Date() && expiration >= new Date()){
                    u.info = "possible problem"
                }
            });
            res.status(200).send({
                data: users
            })
        }).catch((e) => console.log(e))
});

router.get('/licenses' ,function(req, res, next) {
    db.query("SELECT fa_id, kernun_variant, determined_customer, MAX(upload_start) as upload_start, license FROM feedback_arrival WHERE determined_customer IS NOT NULL GROUP BY determined_customer",
        { type: db.QueryTypes.SELECT})
        .then(users => {
            users.forEach(u => {
                if (u.license !=null){
                    u.license = u.license.match('expiration: (.*)\\nupgrade')[1];
                    if (u.license === 'unlimited'){
                        u.saleType = 'sale'
                    }else {
                        if (u.license.length > 0)
                            u.saleType = 'rental'
                    }
                }else {
                    u.license = 'undefined';
                }

                if (u.determined_customer.match('EDU')){
                    u.licenseType = 'edu';
                }else if (u.determined_customer.match('TEST')){
                    u.licenseType = 'test';
                }else if(u.determined_customer.match('NFR')){
                    u.licenseType = 'nfr';
                }
                if (u.kernun_variant && u.kernun_variant.match('kernun_ovpn')){
                }
            });
            res.status(200).send({
                data: users
            })
        }).catch((e) => console.log(e))
});


router.get('/dev' ,function(req, res, next) {
    db.query("SELECT fa_id, kernun_variant, kernun_version, determined_customer, MAX(upload_start) as upload_start, license FROM feedback_arrival WHERE determined_customer IS NOT NULL GROUP BY determined_customer",
        { type: db.QueryTypes.SELECT})
        .then(users => {
            users.forEach(u => {
                if (u.license !=null){
                    u.license = u.license.match('expiration: (.*)\\nupgrade')[1];
                }else {
                    u.license = "undef";
                }
                if (u.determined_customer.match('EDU')){
                    u.licenseType = 'edu';
                }else if (u.determined_customer.match('TEST')){
                    u.licenseType = 'test';
                }else if(u.determined_customer.match('NFR')){
                    u.licenseType = 'nfr';
                }
                if (u.kernun_variant && u.kernun_variant.match('kernun_ovpn')){
                }
            });
            res.status(200).send({
                data: users
            })
        }).catch((e) => console.log(e))
});

router.get('/feedback/detail/:id', function(req, res, next){
    db.query("SELECT * FROM `feedback_arrival` where fa_id = :id",
        { replacements: { id: req.params.id }, type: db.QueryTypes.SELECT})
        .then(record => {
            res.status(200).send({
                data: record
            })
        })
});

module.exports = router;