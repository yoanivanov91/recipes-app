const asyncHandler = require('express-async-handler');

const Recipe = require('../models/Recipe');

const getAllRecipes = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({});
    res.status(200).json(recipes);
});

const getRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findOne({_id: req.params.recipeId});

    if(!recipe) {
        res.status(400);
        throw new Error('Recipe not found');
    }

    res.status(200).json(recipe);
});

const createRecipe = asyncHandler(async (req, res) => {
    const {name, category, image, ingredients, description, ...rest } = req.body;
    if(name == '' || category == '' || image == '' || ingredients.length == 0 || description == '') {
        res.status(400)
        throw new Error(`Please fill out the required fields`);
    }
    
    const recipe = await Recipe.create({
        name,
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
    const {name, category, image, ingredients, description, ...rest } = req.body;
    if(name == '' || category == '' || image == '' || ingredients.length == 0 || description == '') {
        res.status(400)
        throw new Error(`Please fill out the required fields`);
    }

    const recipe = await Recipe.findOne({_id: req.params.recipeId});

    if(!recipe) {
        res.status(400);
        throw new Error('Recipe not found');
    }
    
    if (recipe.owner.toString() !== req.user._id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedRecipe = await Recipe.findOneAndUpdate({_id: req.params.recipeId}, req.body, {
        new: true
    });

    res.status(200).json(updatedRecipe);
});

const deleteRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findOne({_id: req.params.recipeId});

    if(!recipe) {
        res.status(400);
        throw new Error('Recipe not found');
    }

    if (recipe.owner.toString() !== req.user._id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const deletedRecipe = await Recipe.findOneAndDelete({_id: req.params.recipeId});
    res.status(200).json(deletedRecipe);
});

module.exports = {
    getAllRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
}