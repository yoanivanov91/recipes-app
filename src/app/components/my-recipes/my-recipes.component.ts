import { Component, inject, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css'],
})
export class MyRecipesComponent implements OnInit {
  private recipeService = inject(RecipeService);

  myRecipes: any;

  ngOnInit(): void {
    this.recipeService.getMyRecipes().result$.subscribe((data) => {
      this.myRecipes = { ...data };
    });
  }
}
