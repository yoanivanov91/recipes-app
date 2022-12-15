const asyncHandler = require('express-async-handler');
const Recipe = require('../models/Recipe');

const getAllRecipes = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({}).sort({createdAt: -1});
    res.status(200).json(recipes);
});

const getLastTenRecipes = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({}).sort({createdAt: -1}).limit(10);
    res.status(200).json(recipes);
});

const getTenMostPopularRecipes = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({}).sort({likes: -1, createdAt: -1}).limit(10);
    res.status(200).json(recipes);
});

const getMyLikedRecipes = asyncHandler(async (req, res) => {
    const recipes = [...req.user.likedRecipes].reverse();
    res.status(200).json(recipes);
});

const getTenMoreFromCategory = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({category: req.params.category}).sort({likes: -1, createdAt: -1}).limit(10);
    res.status(200).json(recipes);
});

const getTenMoreFromUser = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({owner: req.params.userId}).sort({likes: -1, createdAt: -1}).limit(10);
    res.status(200).json(recipes);
});

const getRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findOne({slug: req.params.slug}).populate('owner');

    if(!recipe) {
        res.status(400);
        throw new Error('Recipe not found');
    }

    res.status(200).json(recipe);
});

const createRecipe = asyncHandler(async (req, res) => {
    const {title, category, image, ingredients, description, ...rest } = req.body;
    if(title == '' || category == '' || image == '' || ingredients.length == 0 || description == '') {
        res.status(400)
        throw new Error(`Please fill out the required fields`);
    }
    
    const recipe = await Recipe.create({
        title,
        category,
        image,
        ingredients,
        description,
        ...rest,
        likes: 0,
        owner: req.user._id
    });
    res.status(200).json(recipe);
});

const updateRecipe = asyncHandler(async (req, res) => {
    const {title, category, image, ingredients, description, ...rest } = req.body;
    if(title == '' || category == '' || image == '' || ingredients.length == 0 || description == '') {
        res.status(400)
        throw new Error(`Please fill out the required fields`);
    }

    const recipe = await Recipe.findOne({slug: req.params.slug});

    if(!recipe) {
        res.status(400);
        throw new Error('Recipe not found');
    }
    
    if (recipe.owner.toString() !== req.user._id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedRecipe = await Recipe.findOneAndUpdate({slug: req.params.slug}, req.body, {
        new: true
    });

    res.status(200).json(updatedRecipe);
});

const deleteRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findOne({slug: req.params.slug});

    if(!recipe) {
        res.status(400);
        throw new Error('Recipe not found');
    }

    if (recipe.owner.toString() !== req.user._id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const deletedRecipe = await Recipe.findOneAndDelete({slug: req.params.slug});
    res.status(200).json(deletedRecipe);
});

module.exports = {
    getAllRecipes,
    getLastTenRecipes,
    getTenMostPopularRecipes,
    getMyLikedRecipes,
    getTenMoreFromCategory,
    getTenMoreFromUser,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
}