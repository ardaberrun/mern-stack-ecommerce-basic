const Category = require("../models/Category");

exports.getCategories = async (req, res) => {
  try {
    
    const categories = await Category.find({});
   
    res.status(200).json({ categories});
  } catch (error) {
    res.status(400).json({ error: 'Hata' });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = new Category({name:req.body.name});

    await category.save();

    res.status(201).json({ message: "Başarıyla kategori eklediniz", category });
  } catch (error) {
    res
      .status(400)
      .json({
        error:
          "Kategori eklenirken hata oluştu lütfen daha sonra tekrar deneyin.",
      });
  }
};



exports.removeCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res
      .status(204)
      .json({ message: "Kategoriyi başarıyla sildiniz", category });
  } catch (error) {
    res
      .status(400)
      .json({
        error:
          "Kategoriyi silerken hata oluştu. Lütfen daha sonra tekrar deneyin",
      });
  }
};
