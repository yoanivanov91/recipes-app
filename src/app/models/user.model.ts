import { Recipe } from './recipe.model'

export interface User {
    _id: String,
    email: String,
    firstName: String,
    lastName: String,
    likedRecipes: String[] | Recipe[]
}