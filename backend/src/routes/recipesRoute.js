const { getAllRecipes, createRecipe, getRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipesController');
const { protect } = require('../middlewares/authMiddleware');

const recipesRoute = require('express').Router();

recipesRoute
    .route('/')
    .get(getAllRecipes)
    .post(protect, createRecipe);

recipesRoute
   .route('/:recipeId')
   .get(getRecipe)
   .put(protect, updateRecipe)
   .delete(protect, deleteRecipe);

module.exports = recipesRoute;
