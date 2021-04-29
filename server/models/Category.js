const mongoose = require("mongoose");
const slugify = require("slugify");

const categorySchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  slug: { type: String, unique: true },
});

categorySchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Category", categorySchema);
