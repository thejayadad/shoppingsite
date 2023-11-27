import mongoose from "mongoose";

const BillboardSchema = new mongoose.Schema({
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      }
}, {timestamps: true})

export default mongoose?.models?.Billboard || mongoose.model("Billboard", BillboardSchema)