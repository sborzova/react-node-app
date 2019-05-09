const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const express = require('express');
const moment = require('moment');
const underscore = require('underscore');

const Feedback = require('../models/feedback.ts');
const License = require('../models/license.ts');
const Device = require('../models/device.ts');
const DeviceStatus = require('../models/deviceStatus.ts');

const db = require('../database.ts');

const deviceRouter = express.Router();

deviceRouter.get('/devices/:customer' ,function(req, res, next) {
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

module.exports = deviceRouter;