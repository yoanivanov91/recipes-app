import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe.model';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  token = '';
  private readonly api_url = environment.api_url;
  private readonly options = {
    headers: {
      "Content-Type": "application/json",
    }
  }
  
  private http = inject(HttpClient);
  
  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.api_url}/recipes`, this.options);
  }

  getLastTenRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.api_url}/recipes/recent`, this.options);
  }

  getTenMostPopularRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.api_url}/recipes/popular`, this.options);
  }

  getMyLikedRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.api_url}/recipes`, this.options);
  }

  getRecentRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.api_url}/recipes`, this.options);
  }

  getRecipe(recipeId: String): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.api_url}/recipes/${recipeId}`, this.options);
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.api_url}/recipes`, recipe, this.options);
  }

  updateRecipe(recipeId: String, recipe: any): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.api_url}/recipes/${recipeId}`, recipe, this.options);
  }

  deleteRecipe(recipeId: String): Observable<Recipe> {
    return this.http.delete<Recipe>(`${this.api_url}/recipes/${recipeId}`, this.options);
  }
  
}
