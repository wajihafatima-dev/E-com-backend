import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true,unique: true  },
  description: { type: String},
  price: { type: Number, required: true},
});

export default mongoose.models.products ||
  mongoose.model("products", ProductSchema);
