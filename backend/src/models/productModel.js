const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Electronics", "Books", "Clothing", "Sports", "Home"],
    },
    price: {
      type: String,
      required: true,
      min: 0, 
      default: 0,
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }
  },
  { timestamps: true }
);

productSchema.index({ updatedAt: -1, _id: -1 });

const Product = mongoose.models.product || mongoose.model("product", productSchema);

module.exports = Product;