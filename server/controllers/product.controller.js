const Product = require("../models/Product");
const Review = require("../models/Review");

exports.getProducts = async (req, res) => {
  try {
    if (req.query.slug) {
      if (req.query.option) {
        const [field, value] = req.query.option.split("_");

        await Product.find({})
          .sort([[field, value]])
          .populate({
            path: "category",
            select: "category.slug",
            match: { slug: req.query.slug },
          })
          .exec(function (err, products) {
            products = products.filter((prod) => prod.category);
     

            res.status(200).json({ products });
          });

      } else {
        await Product.find()
          .populate("category", "category.slug", req.query)
          .exec(function (err, products) {
            products = products.filter((prod) => prod.category);

            res.status(200).json({ products });
          });

      }
    } else {
      // search için buraya da populate eklemen gerekebilir burda dursun.
      let products;

      if(req.query.option)  {
        const [field, value] = req.query.option.split("_");
        products = await Product.find({}).sort([[field, value]]);
      }else {
        products = await Product.find({});
      }
      
      res.status(200).json({ products });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).populate({
      path: "reviews",
      populate: { path: "user", select: "name surname -_id" },
    });

    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error: "Böyle bir ürün yok" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);

    await product.save();

    res.status(201).json({ message: "Başarıyla ürün eklediniz", product });
  } catch (error) {
    res.status(400).json({
      error: "Ürün eklenirken hata oluştu lütfen daha sonra tekrar deneyin.",
    });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({ message: "Ürünü başarıyla güncellediniz", product });
  } catch (error) {
    res.status(400).json({
      error:
        "Ürün güncellenirken hata oluştu. Lütfen daha sonra tekrar deneyin",
    });
  }
};
exports.removeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Ürünü başarıyla sildiniz", product });
  } catch (error) {
    res.status(400).json({
      error: "Ürün silerken hata oluştu. Lütfen daha sonra tekrar deneyin",
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const review = new Review(req.body);

    await review.save();

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          reviews: review,
        },
      },
      { new: true }
    );

    res.status(200).json({ message: "Başarıyla yorum eklendi", product });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Yorum Eklerken hata oluştu..." });
  }
};
