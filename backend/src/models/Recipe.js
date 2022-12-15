const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    slug: { 
        type: String, 
        slug: "title",
        unique: true 
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
    timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;