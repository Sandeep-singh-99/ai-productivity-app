import { model, Schema } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
    },

    lastName: {
        type: String,
    },

    email: {
        type: String,
        unique: true,
    },

    clerkUserId: {
        type: String,
        unique: true,
    },

    imageUrl: {
        type: String,
    }
},{ timestamps: true });

const User = model('User', userSchema);

export default User;