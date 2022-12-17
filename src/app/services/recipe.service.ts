import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UseQuery } from '@ngneat/query';
import { Recipe } from '../models/recipe.model';
import { Like } from '../models/like.model';
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
      'Content-Type': 'application/json',
    },
  };

  public getAllRecipes() {
    return this.useQuery(['allRecipes'], () => {
      return this.http.get<Recipe[]>(`${this.api_url}/recipes`, this.options);
    });
  }

  public getMyRecipes() {
    return this.useQuery(['myRecipes'], () => {
      return this.http.get<Recipe[]>(
        `${this.api_url}/recipes/mine`,
        this.options
      );
    });
  }

  public getRecentAndPopularAndLiked() {
    return this.useQuery(['recentAndPopularAndLikedRecipes'], () => {
      return this.http.get<Recipe[]>(
        `${this.api_url}/recipes/recentPopularLiked`,
        this.options
      );
    });
  }

  public likeRecipe(recipeId: string) {
    return this.http.get<Like>(
      `${this.api_url}/recipes/${recipeId}/like`,
      this.options
    );
  }

  public dislikeRecipe(recipeId: string) {
    return this.http.get<Like>(
      `${this.api_url}/recipes/${recipeId}/dislike`,
      this.options
    );
  }


  // public getLastTenRecipes() {
  //   return this.useQuery(['recentRecipes'], () => {
  //     return this.http.get<Recipe[]>(
  //       `${this.api_url}/recipes/recent`,
  //       this.options
  //     );
  //   });
  // }

  // public getTenMostPopularRecipes() {
  //   return this.useQuery(['popularRecipes'], () => {
  //     return this.http.get<Recipe[]>(
  //       `${this.api_url}/recipes/popular`,
  //       this.options
  //     );
  //   });
  // }

  // public getMyLikedRecipes() {
  //   return this.useQuery(['likedRecipes'], () => {
  //     return this.http.get<Recipe[]>(
  //       `${this.api_url}/recipes/liked`,
  //       this.options
  //     );
  //   });
  // }

  // public getTenMoreRecipesFromCategory(recipeId: String, category: String) {
  //   return this.useQuery(['moreFromCategory'], () => {
  //     return this.http.get<Recipe[]>(
  //       `${this.api_url}/recipes/more/category/${recipeId}/${category}`,
  //       this.options
  //     );
  //   });
  // }

  // public getTenMoreRecipesFromUser(recipeId: String, userId: String) {
  //   return this.useQuery(['moreFromUser'], () => {
  //     return this.http.get<Recipe[]>(
  //       `${this.api_url}/recipes/more/user/${recipeId}/${userId}`,
  //       this.options
  //     );
  //   });
  // }

  public getRecipe(slug: String) {
    return this.useQuery(['allRecipes', slug], () => {
      return this.http.get<Recipe>(
        `${this.api_url}/recipes/${slug}`,
        this.options
      );
    });
  }
}
