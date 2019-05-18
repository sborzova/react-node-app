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

    return customers;
};

module.exports = {
    groupByDeviceHostid: groupByDeviceHostid,
    groupByHostid: groupByHostid,
    processDataCustomers: processDataCustomers,
};