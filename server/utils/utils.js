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

const groupByDeterminedCustomer = (data) => {
    let groups = underscore.groupBy(data, function(object) {
        return object.determined_customer;
    });
    return groups
};

const processDataCustomers = (data) => {
    let groups = groupByDeterminedCustomer(data);
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
        if (d.expiration === 'unlimited'){
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

const processVariants = (data) => {
    let groups = underscore.groupBy(data, function(object) {
        return object.kernun_variant + '#' + object.kernun_version;
    });

    let groupsObjects = underscore.map(groups, function(group){
        return {
            kernun_variant: group[0].kernun_variant,
            kernun_version: group[0].kernun_version,
            count: group.length
        }
    });

    let groupsByVersion = underscore.groupBy(groupsObjects, function (object) {
        return object.kernun_variant;
    });

    return groupsByVersion;
};

module.exports = {
    groupByDeviceHostid: groupByDeviceHostid,
    groupByHostid: groupByHostid,
    processDataCustomers: processDataCustomers,
    processDataLicenses: processDataLicenses,
    processVariants: processVariants
};