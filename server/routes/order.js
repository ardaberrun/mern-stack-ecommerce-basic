const router = require("express").Router();
const auth = require("../middlewares/auth");
const {getOrders,buyProducts} = require('../controllers/order.controller'); 


// @ --> api/order

router.get("/", auth ,getOrders);
router.post("/", auth , buyProducts);

module.exports = router;
