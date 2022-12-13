import { User } from "./user.model"

export interface Recipe {
    _id: String,
    name: String,
    category: String,
    image: String,
    ingredients: String[],
    description: String,
    time?: String,
    likes: Number,
    owner: User
}