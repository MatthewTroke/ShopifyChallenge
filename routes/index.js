const express = require("express");
const Shopify = require("./../connectors/shopify");

const router = express.Router();

router.get("/", function(req, res, next) {
  return new Shopify()
    .get("products.json")
    .then(data => res.status(data.statusCode).json(data.body))
    .catch(err => res.status(err.statusCode).json(err));
});

module.exports = router;
