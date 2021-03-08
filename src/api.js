import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_BASE;

const axiosInstance = axios.create({
  responseType: 'json',
  baseURL: BACKEND_URL,
});

const responseToData = (response) => response.data;

const getCustomers = (storeName) => {
  return axiosInstance
    .get('/customers', { params: { store: storeName } })
    .then(responseToData)
    .then((dataFormal) => dataFormal.data);
};

const createCustomer = (storeName, customerData) => {
  return axiosInstance
    .post('/customers', { params: { store: storeName }, data: customerData })
    .then(responseToData)
    .then((dataFormal) => dataFormal.data);
};

const listFields = (storeName) => {
  return axiosInstance
    .get('/fields', { params: { store: storeName } })
    .then(responseToData)
    .then((dataFormal) => dataFormal.data);
};

const createField = (storeName, fieldName, fieldType) => {
  return axiosInstance
    .post('/fields', {
      params: { store: storeName },
      data: { fieldName, fieldType },
    })
    .then(responseToData)
    .then((dataFormal) => dataFormal.data);
};

export { getCustomers, createCustomer, listFields, createField };
