const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {
  try {
    const user = await Cart.findOne({ user: req.user._id }).populate({
      path: "basket.product",
      select: "-reviews",
    });
    res.status(200).json({ message: "User cart info", basket: user.basket });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Kullanıcı sepete bilgilerini getirirken hata..." });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const user = await Cart.findOneAndUpdate(
      { user: req.user._id },
      {
        $push: {
          basket: { product: req.body.cartItem },
        },
      },
      { new: true }
    ).populate({ path: "basket.product", select: "-reviews" });
    res
      .status(200)
      .json({ message: "Sepete başarıyla ürün eklendi", basket: user.basket });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Sepete ürün eklerken hata oluştu..." });
  }
};

exports.changeQuantity = async (req, res) => {
  try {
    const user = await Cart.findOneAndUpdate(
      { user: req.user._id, "basket.product": req.query.product },
      {
        $set: {
          "basket.$.quantity": +req.query.qty,
        },
      },
      { new: true }
    );

    res.status(200).json({ message: "Ürün bilgileri güncellendi." });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Kullanıcı sepet bilgilerini getirirken hata..." });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const userCart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { basket: { product: req.params.productId } } },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Ürün başarıyla silindi", basket: userCart.basket });
  } catch (e) {
    console.log(e);
  }
};
