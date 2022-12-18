import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { addEntity, QueryClientService, removeEntity, UseQuery } from '@ngneat/query';
import { Recipe } from '../models/recipe.model';
import { Like } from '../models/like.model';
import { environment } from '../environment/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private http = inject(HttpClient);
  private useQuery = inject(UseQuery);
  private queryClient = inject(QueryClientService)

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
    return this.http.post<Like>(
      `${this.api_url}/recipes/like`,
      {recipeId},
      this.options
    ).pipe(tap(like => {
      this.queryClient.invalidateQueries(['allRecipes']);
    }));
  }

  public dislikeRecipe(recipeId: string) {
    return this.http.post<Like>(
      `${this.api_url}/recipes/dislike`,
      {recipeId},
      this.options
    ).pipe(tap(dislike => {
      this.queryClient.invalidateQueries(['allRecipes']);
    }));
  }

  public getRecipe(slug: string) {
    return this.useQuery(['allRecipes', slug], () => {
      return this.http.get<Recipe>(
        `${this.api_url}/recipes/${slug}`,
        this.options
      );
    });
  }

  public addRecipe(recipe: Recipe) {
    return this.http.post<Recipe>(
      `${this.api_url}/recipes`,
      recipe,
      this.options).pipe(tap(newRecipe => {
        this.queryClient.invalidateQueries(['allRecipes']);
    }));
  }

  public editRecipe(recipeId: string, recipe: Recipe) {
    return this.http.put<Recipe>(
      `${this.api_url}/recipes/${recipeId}`,
      recipe,
      this.options).pipe(tap(updatedRecipe => {
        this.queryClient.invalidateQueries(['allRecipes']);
    }));
  }

  public deleteRecipe(recipeId: string) {
    return this.http.delete<Recipe>(
      `${this.api_url}/recipes/${recipeId}`,
      this.options).pipe(tap(deletedRecipe => {
        this.queryClient.invalidateQueries(['allRecipes']);
        this.queryClient.invalidateQueries(['myRecipes']);
    }));
  }
}
