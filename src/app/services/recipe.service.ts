import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UseQuery } from '@ngneat/query';
import { Recipe } from '../models/recipe.model';
import { environment } from '../environment/environment';


@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private http = inject(HttpClient);
  private useQuery = inject(UseQuery);

  private readonly api_url = environment.api_url;
  private readonly options = {
    headers: {
      "Content-Type": "application/json",
    }
  }
  private user: null = null;

  getAllRecipes() {
    return this.useQuery(['allRecipes'], () => {
      return this.http.get<Recipe[]>(`${this.api_url}/recipes`, this.options);
    });
  }

  getLastTenRecipes() {
    return this.useQuery(['recentRecipes'], () => {
      return this.http.get<Recipe[]>(`${this.api_url}/recipes/recent`, this.options);
    });
  }

  getTenMostPopularRecipes() {
    return this.useQuery(['popularRecipes'], () => {
      return this.http.get<Recipe[]>(`${this.api_url}/recipes/popular`, this.options);
    });
  }

  getMyLikedRecipes() {
    return this.useQuery(['likedRecipes'], () => {
      return this.http.get<Recipe[]>(`${this.api_url}/recipes/liked`, this.options);
    }, {enabled: !!this.user});
  }

  getTenMoreRecipesFromCategory(category: String) {
    return this.useQuery(['moreFromCategory'], () => {
      return this.http.get<Recipe[]>(`${this.api_url}/recipes/more/category/${category}`, this.options);
    });
  }

  getTenMoreRecipesFromUser(userId: String) {
    return this.useQuery(['moreFromUser'], () => {
      return this.http.get<Recipe[]>(`${this.api_url}/recipes/more/user/${userId}`, this.options);
    });
  }

  getRecipe(slug: String) {
    return this.useQuery(['recipes', slug], () => {
      return this.http.get<Recipe>(`${this.api_url}/recipes/${slug}`, this.options);
    });
  }

  // getTodo(id: number) {
  //   return this.useQuery(['todo', id], () => {
  //     return this.http.get<Todo>(
  //       `https://jsonplaceholder.typicode.com/todos/${id}`
  //     );
  //   });
  // }
}
