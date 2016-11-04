const Order = require('../db/models/order')
const OrderProduct = require('../db/models/orderProduct')
const Product = require('../db/models/product')

const cart = require('express').Router()

    //GET ALL PRODUCTS IN ORDER
    .get('/', (req, res, next) =>
        OrderProduct.findAll({
            where: {
                order_id: req.session.orderId
            }
        })
        .then(function(allProducts){
            res.send(allProducts)
        })
        .catch(next)
    )

    //GET ALL PAST ORDERS
    .get('/orderhistory', (req, res, next) =>
        Order.findAll({
            where: {
                user_id: req.user.id,
                status: {$not: 'pending'}
            }
        })
        .then(function(orderhistory) {
            res.send(orderhistory)
        })
        .catch(next)
    )
    //ADD ITEM TO CART
    .post('/', (req, res, next) => {
        if(req.user) {
            Order.findOrCreate({
             where: {status: pending, user_id: req.user.id}
            })
            .then(function(foundOrder) {  //req,body is product
            req.session.orderId = foundOrder[0].id
            return foundOrder[0].addProduct(req.body, {name: req.body.name, price: req.body.price})
            })
            .then(function(order) {
                res.sendStatus(201)
            })
        }
        else {
            if(!req.session.orderId) {
                Order.create({})
                .then(function(createdOrder) {
                    req.session.orderId = createdOrder.id
                    return createdOrder.addProduct(req.body, {name: req.body.name, price: req.body.price})
                })
                .then(function(order) {
                    res.sendStatus(201)
                })
            } else {
                Order.findById(req.session.orderId)
                .then(function(foundOrder) {
                    return foundOrder.addProduct(req.body, {name: req.body.name, price: req.body.price})
                })
                .then(function(order) {
                    res.sendStatus(201)
                })
            }
        }
    })


    //DELETE ITEM FROM CART
    .delete('/:productId', (req, res, next) =>
        Order.findById(req.session.orderId)
        .then(function(foundOrder) {
            return foundOrder.removeProduct(productId)
        })
    )

    ///EDIT quantity in  text input field
    // .put('/:productId', (req, res, next) =>

    // )



module.exports = cart
