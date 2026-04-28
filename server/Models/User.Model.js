import mongoose from "mongoose";

/**
 * Review Schema
 * Represents a review submitted by a user for a location.
 */
const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    location: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5
    }
}, {
    timestamps: true
});

/**
 * Contact Schema
 * Represents an emergency contact associated with a user.
 */
const ContactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Owner of this contact
        required: true
    },
    photo: {
        type: String,
        default: "../Utils/woman.webp" // Default contact photo if none provided
    },
    name: {
        type: String,
        required: true // Contact's name
    },
    MobileNo: {
        type: String,
        required: true // Contact's mobile number
    }
}, {
    timestamps: true
});

/**
 * User Schema
 * Represents a user of Shakti Shield.
 */
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true // Username or display name
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique across users
    },
    password: {
        type: String,
        required: function () {
            return !this.isGoogleUser; 
            // Password required only if not a Google user
        }
    },
    profilePhoto: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvFbJHIvlkPWSvsJ1rWRbr64ZPiCCdb1SCLg&s" 
        // Default profile photo
    },
    reviews: {
        type: [ReviewSchema],
        default: [] // Array of embedded reviews
    },
    contacts: {
        type: [ContactSchema],
        default: [] // Array of embedded contacts
    },
    googleId: {
        type: String,
        sparse: true // Allows Google ID to be unique only where present
    },
    isGoogleUser: {
        type: Boolean,
        default: false // Flag to distinguish Google users
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date }
}, {
    timestamps: true
});

// Create an index for googleId only when it's present (sparse)
UserSchema.index({ googleId: 1 }, { sparse: true });

/**
 * User model
 */
const User = mongoose.model("User", UserSchema);

export default User;
