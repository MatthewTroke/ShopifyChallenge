const express = require('express');
const Shopify = require('./../connectors/shopify');

const router  = express.Router();

router.get('/', function(req, res, next) {
  const { path } = req.query;

  return new Shopify().get(path)
    .then(data => res.status(data.statusCode).json(data.body))
    .catch(err => res.status(err.statusCode).json(err))
});

router.post('/', function(req, res, next) {
  const { body, query: { path } } = req;

  return new Shopify().post(path, body)
    .then(data => res.status(data.statusCode).json(data.body))
    .catch(err => res.status(err.statusCode).json(err))
});

router.put('/', function(req, res, next) {
  const { body, query: { path } } = req;

  return new Shopify().put(path, body)
    .then(data => res.status(data.statusCode).json(data.body))
    .catch(err => res.status(err.statusCode).json(err))
});

router.delete('/', function(req, res, next) {
  const { path } = req.query;

  return new Shopify().delete(path)
    .then(data => res.status(data.statusCode).json(data.body))
    .catch(err => res.status(err.statusCode).json(err))
});

module.exports = router;
