import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      billboards: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Billboard',
        },
      ],
    }, {
      timestamps: true,

    })

export default mongoose?.models?.Store || mongoose.model("Store", StoreSchema)