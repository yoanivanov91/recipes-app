import { Component, inject, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private recipeService = inject(RecipeService);

  recentlyAddedRecipes$ = this.recipeService.getLastTenRecipes().result$;
  popularRecipes$ = this.recipeService.getTenMostPopularRecipes().result$;
  myLikedRecipes$ = this.recipeService.getMyLikedRecipes().result$;
  recentlyAddedRecipes: any;
  popularRecipes: any;
  myLikedRecipes: any;
  user: any = null;

  ngOnInit(): void {
    this.recentlyAddedRecipes$.subscribe(data => {
      this.recentlyAddedRecipes = {...data}
    });
    this.popularRecipes$.subscribe(data => {
      this.popularRecipes = {...data}
    });
    this.myLikedRecipes$.subscribe(data => {
      this.myLikedRecipes = {...data}
    });
  }

}
