import axios from 'axios';

export const getCountAllFeedback = (period) => axios.get(`/api/feedback/all/${period}`);

export const getCountHits = (period, customer) => axios.get(`/api/hits/${period}/` + customer);

export const getCountDomains = (period, customer) => axios.get(`/api/domains/${period}/` + customer);

export const getAllCustomers = () => axios.get(`/api/customers`, );

export const getFeedback = (id) => axios.get(`/api/feedback/detail/${id}`);

export const getAllFeedbacksForInterval = (type, fromDate, toDate) =>
    axios.get(`/api/${type}`,{params: {from: fromDate, to: toDate}});

export const getCountFeedback = (type) => axios.get(`/api/feedback/${type}`,);

export const getCountDevices = (customer) => axios.get(`/api/devices/${customer}`);

export const getLicense = (serial) => axios.get(`/api/license/detail/${serial}`);

export const getAllLicenses = () => axios.get(`/api/licenses`, );

export const getCountKernunVersion = (date) => axios.get(`/api/statistic/kernun`, {params: {date: date}});

export const getCountKcw = (date) => axios.get(`/api/statistic/kcw`, {params: {date: date}});





