import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_BASE;

const axiosInstance = axios.create({
  responseType: 'json',
  baseURL: BACKEND_URL,
});

const responseToData = (response) => response.data;

const getCustomers = (storeName, { limit, skip }) => {
  return axiosInstance
    .get('/customers', { params: { store: storeName, skip, limit } })
    .then(responseToData)
    .then((dataFormal) => dataFormal.data);
};

const createCustomer = (storeName, customerData) => {
  return axiosInstance
    .post('/customers', customerData, { params: { store: storeName } })
    .then(responseToData)
    .then((dataFormal) => dataFormal.data);
};

const deleteCustomer = (storeName, email) => {
  return axiosInstance
    .delete('/customers', { params: { store: storeName }, data: { email } })
    .then(responseToData)
    .then((dataFormal) => dataFormal.data);
};

const getCustomerCount = (storeName) => {
  return axiosInstance
    .get('/customers/count', { params: { store: storeName } })
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
    .post(
      '/fields',
      { fieldName, fieldType },
      {
        params: { store: storeName },
      }
    )
    .then(responseToData)
    .then((dataFormal) => dataFormal.data);
};

const deleteField = (storeName, fieldName) => {
  return axiosInstance
    .delete('/fields', {
      params: { store: storeName },
      data: { fieldName },
    })
    .then(responseToData)
    .then((dataFormal) => dataFormal.data);
};

export {
  getCustomers,
  createCustomer,
  deleteCustomer,
  listFields,
  createField,
  deleteField,
  getCustomerCount,
};
