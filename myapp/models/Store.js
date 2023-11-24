import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

}, {timestamps: true})

export default mongoose?.models?.Store || mongoose.model("Store", StoreSchema)