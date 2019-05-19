import axios from 'axios';

export const getCountAllFeedback = (period) => axios.get(`/api/feedback/all/${period}`);

export const getCountHits = (period, customer) => axios.get(`/api/hits/${period}/` + customer);

export const getCountDomains = (period, customer) => axios.get(`/api/domains/${period}/` + customer);

export const getAllCustomers = () => axios.get(`/api/customers`, );

export const getFeedback = (id) => axios.get(`/api/feedback/detail/${id}`);

export const getAllFeedbacksForInterval = (type, fromDate, toDate) =>
    axios.get(`/api/${type}`,{params: {from: fromDate, to: toDate}});

export const getAllFeedbacksForKernunVariant = (kernunVariant, uploadStart) =>
    axios.get(`/api/feedback/kernunvariant`,
        {params : {kernunVariant: kernunVariant, uploadStart: uploadStart}});

export const getAllFeedbacksForKernunVersion = (kernunVersion, uploadStart) =>
    axios.get(`/api/feedback/kernunversion`,
        {params : {kernunVersion: kernunVersion, uploadStart: uploadStart}});

export const getAllFeedbacksForKcwFunction = (kcwFunction, uploadStart, value) =>
    axios.get(`/api/feedback/kcwfunction`,
        {params : {kcwFunction: kcwFunction, uploadStart: uploadStart, value: value}});

export const getAllFeedbacksForKcwAuth = (kcwAuth, uploadStart) =>
    axios.get(`/api/feedback/kcwauth`,
        {params : {kcwAuth: kcwAuth, uploadStart: uploadStart}});

export const getCountFeedback = (type) => axios.get(`/api/feedback/${type}`,);

export const getCountProcessed = () => axios.get(`/api/feedback/all/processed`,);

export const getCountDevices = (customer) => axios.get(`/api/devices/${customer}`);

export const getLicense = (serial) => axios.get(`/api/license/detail/${serial}`);

export const getAllLicenses = () => axios.get(`/api/licenses`, );

export const getCountKernunVersion = (date) => axios.get(`/api/statistic/kernunvariants`, {params: {date: date}});

export const getCountKcw = (date) => axios.get(`/api/statistic/kcw`, {params: {date: date}});





