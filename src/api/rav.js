import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.RAV_SERVER_BASE_URL || '',
  withCredentials: true
});

export const fetchCart = () =>
  instance.get('/cart')
    .then((res) => res)
    .catch(err => { throw err });

export const addToCart = (orderLine) =>
  instance.post('/cart', orderLine)
    .then((res) => res)
    .catch(err => { throw err });

export const deleteFromCart = (id) =>
  instance.delete(`/cart/${id}`)
    .then((res) => res)
    .catch((err) => { throw err });

export const updateItemInCart = (id, quantity) =>
  instance.put(`/cart/${id}`, { quantity })
    .then((res) => res)
    .catch((err) => { throw err });

export const createCheckout = (klarnaOrder) =>
  instance.post(`/checkout`, klarnaOrder)
    .then((res) => res)
    .catch((err) => { throw err });

export const getCheckoutById = (orderId) =>
  instance.get(`/checkout/${orderId}`)
    .then((res) => res)
    .catch((err) => { throw err });

export const confirmCheckoutPurchase = (orderId) =>
  instance.post(`/checkout/confirm/${orderId}`)
    .then((res) => res)
    .catch((err) => { throw err });
