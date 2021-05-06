const router = require("express").Router();
const auth = require("../middlewares/auth");
const {getCart,addToCart,changeQuantity,removeCartItem} = require('../controllers/cart.controller'); 


router.get("/", auth ,getCart);
router.post("/", auth , addToCart);
router.patch('/',auth,changeQuantity);
router.patch('/:productId',auth,removeCartItem);



module.exports = router;
