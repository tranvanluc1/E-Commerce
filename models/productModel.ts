import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    images: {
      type: Array<string>,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
    inStock: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const dataSet =
  mongoose.models.product || mongoose.model("product", productSchema);

export default dataSet;
