import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackNavigationService } from 'src/app/services/back-navigation.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  private recipeService = inject(RecipeService);
  private route = inject(ActivatedRoute);
  private navigation = inject(BackNavigationService);
  recipe: any;
  moreFromCategory: any;
  moreFromUser: any;
  isIngredientsOpen: boolean = false;
  isHowToOpen: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const { slug } = params;
      this.recipeService.getRecipe(slug).result$.subscribe(data => {
        this.recipe = {...data};
        if(this.recipe.isSuccess) {
          this.getCategoryAndUserRecipes(this.recipe.data.category, this.recipe.data.owner._id);
        }
      });
    });
  }

  getCategoryAndUserRecipes(category: String, userId: String) {
    this.recipeService.getTenMoreRecipesFromCategory(category).result$.subscribe(data => {
      this.moreFromCategory = {...data};
    });
    this.recipeService.getTenMoreRecipesFromUser(userId).result$.subscribe(data => {
      this.moreFromUser = {...data};
    });
  }

  stringAsDate(dateStr: string) {
    return new Date(dateStr);
  }

  back() {
    this.navigation.back();
  }

  toggleIngredients() {
    this.isIngredientsOpen = !this.isIngredientsOpen;
  }

  toggleHowTo() {
    this.isHowToOpen = !this.isHowToOpen;
  }
}
