import { Injectable } from '@angular/core';
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
  private readonly auth_headers = {
    headers: {
      "Content-Type": "application/json",
      "Autorization": "Bearer " + this.token
    }
  }
  private readonly normal_headers = {
    headers: {
      "Content-Type": "application/json",
      "Autorization": "Bearer " + this.token
    }
  }
  
  constructor(private http: HttpClient) { }

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.api_url}/recipes`, this.normal_headers);
  }

  getRecipe(recipeId: String): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.api_url}/recipes/${recipeId}`, this.normal_headers);
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.api_url}/recipes`, recipe, this.auth_headers);
  }

  updateRecipe(recipeId: String, recipe: any): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.api_url}/recipes/${recipeId}`, recipe, this.auth_headers);
  }

  deleteRecipe(recipeId: String): Observable<Recipe> {
    return this.http.delete<Recipe>(`${this.api_url}/recipes/${recipeId}`, this.auth_headers);
  }
  
}
