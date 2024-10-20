import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      new_price: {
        type: Number,
        required: true,
      },
      old_price: {
        type: Number,
        required: true,
      },
      slug:{
        type: String,
        required: true,
        unique:true,
      }
},{timestamps:true});

const Product = mongoose.model("Product",productSchema);
export default Product