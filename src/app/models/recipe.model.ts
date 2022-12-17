import { User } from "./user.model"

export interface Recipe {
    _id: string,
    title: string,
    slug: string,
    category: string,
    image: string,
    ingredients: string[],
    description: string,
    time?: string,
    likes: number,
    owner: string | User
}