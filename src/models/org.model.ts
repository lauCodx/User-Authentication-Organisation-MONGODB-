import mongoose from "mongoose";

const orgSchema = new mongoose.Schema({
    name: String,
    description: String,
    userId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
},
{
    timestamps: true
})

const Org = mongoose.model("Org", orgSchema);

export default Org