const router = require("express").Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/admin");
const {
    getCategories,
    createCategory,
    removeCategory,
} = require("../controllers/category.controller");

router.get("/", getCategories);

router.post("/", auth, isAdmin, createCategory);

router.delete("/:id", auth,isAdmin, removeCategory);

module.exports = router;
