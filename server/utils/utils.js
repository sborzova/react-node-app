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

const processFeedbacksStatus = (data) => {
    data.forEach(d => {
        let color = [];
        if (d.license && moment(d.license.expiration).isBefore(moment())){
            color.push('red');
            let devcount = parseInt(d.license.devcount);
            if (devcount && d.reporter){
                if (devcount > d.reporter.reporter_users){
                    color.push('blue');
                }
                if (devcount > d.reporter.reporter_clients){
                    color.push('pink')
                }
            }
        }
        if (d.deviceStatus){
            if (!d.deviceStatus.uptime.includes('day')){
                color.push('black');
            }
            if (d.deviceStatus.n_panics && d.deviceStatus.n_panics != 0){
                color.push('yellow');
            }
            if (d.deviceStatus.n_aborts && d.deviceStatus.n_aborts != 0){
                color.push('orange');
            }
            if (d.deviceStatus.core_dumps && d.deviceStatus.core_dumps.length > 0){
                color.push('green');
            }
        }

        d.color = color;
    });

    return data
};

module.exports = {
    groupByDeviceHostid: groupByDeviceHostid,
    groupByHostid: groupByHostid,
    processDataCustomers: processDataCustomers,
    processFeedbacksStatus: processFeedbacksStatus
};