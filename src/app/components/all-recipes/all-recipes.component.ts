import { Component, inject, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css']
})
export class AllRecipesComponent implements OnInit {
  private recipeService = inject(RecipeService);
  private route = inject(ActivatedRoute);

  allRecipes$ = this.recipeService.getAllRecipes().result$;
  allRecipes: any;

  show: String;
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.show = params["show"];
        if(params['show'] === 'popular') {
          this.allRecipes$.subscribe((recipeData) => {
            this.allRecipes = { ...recipeData, data: [...(recipeData.data || [])].sort((a, b) => Number(b.likes) - Number(a.likes)) };
          });
        } else {
          this.allRecipes$.subscribe((recipeData) => {
            this.allRecipes = { ...recipeData };
          });
        }   
      }
    );
  }
}
