const underscore = require('underscore');
const moment = require('moment');

const groupByDeviceHostid = (data) => {
    let groups = underscore.groupBy(data, function (object) {
        return object.device.hostid;
    });
    return groups;
};

const groupByHostid = (data) => {
    let groups = underscore.groupBy(data, function (object) {
        return object.hostid;
    });
    return groups;
};

const processDataCustomers = (data) => {
    let groups = underscore.groupBy(data, function(object) {
        return object.determined_customer;
    });
    const determinedCustomers = Object.keys(groups);
    let customers = [];
    determinedCustomers.forEach(customer => {
        const feedbacks = groups[customer];
        feedbacks.forEach(feedback =>{
            let status = 'other';
            if (moment(feedback.upgrade).isAfter(moment())){
                if (moment(feedback.upload_start).format('L') == moment().format('L')){
                    status = 'activeWithFb';
                }else{
                    status = 'activeNoFb';
                }
            }else if(!moment(feedback.upgrade).isAfter(moment())){
                if (moment(feedback.upload_start).format('L') == moment().format('L')){
                    status = 'inactiveWithFb';
                }else{
                    status = 'inactiveNoFb';
                }
            }
            feedback.status = status;
        });
        customers.push({determined_customer: customer, feedbacks: feedbacks});
    });
    return customers;
};

const processDataLicenses = (data) => {
    data.forEach(d => {
        if (d.expiration == 'unlimited'){
            d.saleType = 'sale';
        }else {
            d.saleType = 'rental'
        }
        if (d.determined_customer){
            if (d.determined_customer.match('EDU')){
                d.licenseType = 'edu';
            }else if (d.determined_customer.match('TEST')){
                d.licenseType = 'test';
            }else if(d.determined_customer.match('NFR')){
                d.licenseType = 'nfr';
            }
        }
    });
    return data
};

module.exports = {
    groupByDeviceHostid: groupByDeviceHostid,
    groupByHostid: groupByHostid,
    processDataCustomers: processDataCustomers,
    processDataLicenses: processDataLicenses
};