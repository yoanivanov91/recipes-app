const mongoose = require('mongoose');
// const Double = require('@mongoosejs/double');

const recipeSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        trim: true,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    time: {
        type: Number,
        trim: true,
    },
    likes: {
        type: Number,
        trim: true,
        required: true,
        default: 0
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestaps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;