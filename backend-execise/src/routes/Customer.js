"use strict";

var express = require("express");
var {
    Customer
} = require("../controllers");
var router = (module.exports = express.Router());

router.get("/grossaries", Customer.get_grossaries);
router.post("/grossaries", Customer.create_grossaries);
router.get("/grossaries/:item_id", Customer.get_grossary);
router.put("/grossaries/:item_id", Customer.update_grossary);
router.delete("/grossaries/:item_id", Customer.delete_grossary);

 
 