const router = require("express").Router();
const auth = require("../middlewares/auth");
const {getCart,addToCart,changeQuantity} = require('../controllers/cart.controller'); 


router.get("/", auth ,getCart);
router.post("/", auth , addToCart);
router.patch('/',auth,changeQuantity)



module.exports = router;
