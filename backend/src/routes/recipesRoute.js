const { getAllRecipes, createRecipe, getRecipe, updateRecipe, deleteRecipe, getLastTenRecipes, getTenMostPopularRecipes, getMyLikedRecipes, getTenMoreFromCategory, getTenMoreFromUser } = require('../controllers/recipesController');
const { protect } = require('../middlewares/authMiddleware');

const recipesRoute = require('express').Router();

recipesRoute
    .route('/')
    .get(getAllRecipes)
    .post(protect, createRecipe);

recipesRoute
    .route('/recent')
    .get(getLastTenRecipes);

recipesRoute
    .route('/popular')
    .get(getTenMostPopularRecipes);

recipesRoute
    .route('/more/category/:category')
    .get(getTenMoreFromCategory);

recipesRoute
    .route('/more/user/:userId')
    .get(getTenMoreFromUser);

recipesRoute
    .route('/liked')
    .get(protect, getMyLikedRecipes);

recipesRoute
   .route('/:slug')
   .get(getRecipe)
   .put(protect, updateRecipe)
   .delete(protect, deleteRecipe);

module.exports = recipesRoute;
