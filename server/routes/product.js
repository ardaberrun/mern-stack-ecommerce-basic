const router = require("express").Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/admin");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  removeProduct,
  addComment
} = require("../controllers/product.controller");

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/:id/comment",auth, addComment);

router.post("/", auth, isAdmin, createProduct);

router.put("/:id", auth, isAdmin, updateProduct);

router.delete("/:id", auth,isAdmin, removeProduct);

module.exports = router;
