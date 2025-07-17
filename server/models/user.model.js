import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
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
})

const User = model('User', userSchema);

export default User;