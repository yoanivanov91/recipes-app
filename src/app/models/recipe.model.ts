import { User } from "./user.model"

export interface Recipe {
    _id: String,
    title: String,
    slug: String,
    category: String,
    image: String,
    ingredients: String[],
    description: String,
    time?: String,
    likes: Number,
    owner: String | User
}