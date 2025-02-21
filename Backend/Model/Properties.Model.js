// just_home/Backend/Model/Properties.Model.js
// just_home/Backend/Model/Properties.Modal.js
import mongoose from 'mongoose';

const propertiesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    priceUnit: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    propertyType: {
        type: String,
        required: true
    },
    facilities: {
        type: [String], // Array of facility names
        default: []
    },
    coverimg: {
        type: String,
        required: true
    },
    images: {
        type: [String], // Array of image URLs
        default: []
    },
    videoTour: {
        type: String
    },
    owner: {
        type: String,
        required: true
    },
    ownerEmail: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    overallRating: {
        type: Number,
        default: 0
    },
    happyPeoplePercentage: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        required: true
    },
    yearBuilt: {
        type: Number
    },
    furnished: {
        type: String
    },
    parking: {
        type: String
    },
    petFriendly: {
        type: Boolean,
        default: false
    },
    nearbyLandmarks: {
        type: [String], // Array of landmarks
        default: []
    },
    governmentApproved: {
        type: Boolean,
        default: false
    },
    discountOffer: {
        type: String
    },
    reviews: [
        {
            user: { type: String, required: true },
            rating: { type: Number, required: true },
            comment: { type: String }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    searchableFields: {
        type: [String], // Array of searchable terms
        default: []
    }
});

export const Property = mongoose.model("Properties", propertiesSchema);
