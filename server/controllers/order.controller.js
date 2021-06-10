const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findOne({ user: req.user._id }).sort([['createdAt', '-1']]).populate({
      path: "orders.products.product",
      select: "_id image",
    });

    res
      .status(200)
      .json({ message: "Satın alma geçmişi getirildi", orders: orders.orders });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Satın alma geçmişi getirilirken bir hata" });
  }
};

exports.buyProducts = async (req, res) => {
  try {
    const newOrder = await Order.findOneAndUpdate(
      { user: req.user._id },
      {
        $push: {
          orders: {
            price: req.body.totalPriceOfProductsToBuy,
            products: req.body.productsToBuy,
          },
        },
      },
      { new: true }
    );

    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $set: { basket: [] } }
    );
    
    res
      .status(200)
      .json({ message: "Satın alma işlemi başarılı", orders: newOrder });
  } catch (error) {
    res.status(400).json({ message: "Satın alma işleminde hata oluştu" });
  }
};
