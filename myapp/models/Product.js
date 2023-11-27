import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store', 
        default: []
      },
    
   }, {timestamps: true})

export default mongoose?.models?.Product || mongoose.model("Product", ProductSchema)