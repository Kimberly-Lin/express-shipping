"use strict";

const express = require("express");
const router = new express.Router();

const { shipProduct } = require("../shipItApi");
const jsonschema = require("jsonschema");
const orderSchema = require("../schemas/orderSchema.json");
const { BadRequestError } = require("../expressError")

/** POST /ship
 *
 * VShips an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {
  const { productId, name, addr, zip } = req.body;

  const validSchema = jsonschema.validate(req.body, orderSchema);

  if (!validSchema.valid) {
    let errs = validSchema.errors.map(err => err.stack);
    throw new BadRequestError(errs);
  }

  const shipId = await shipProduct({ productId, name, addr, zip });
  return res.json({ shipped: shipId });
});


module.exports = router;