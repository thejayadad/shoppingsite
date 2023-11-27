import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    products: {
      type: String,
      default: []
  },
   }, {timestamps: true})

export default mongoose?.models?.Store || mongoose.model("Store", StoreSchema)