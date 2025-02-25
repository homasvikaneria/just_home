// Backend/Model/Users.Model.js
import mongoose from 'mongoose';

const usersSchema = mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImagePath: { type: String, default: "" },
    
    wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Properties" }],  // ✅ Store references
    reservationList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservations" }], 
    propertyList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Properties" }] 
}, { timestamps: true });

export const Users = mongoose.model("Users", usersSchema);
