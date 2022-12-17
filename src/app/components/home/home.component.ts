import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private recipeService = inject(RecipeService);
  private authService = inject(AuthService);

  recipes: any;
  recentlyAddedRecipes: any;
  popularRecipes: any;
  myLikedRecipes: any;
  user: User | null;

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.user = user;
      this.recipeService
        .getRecentAndPopularAndLiked()
        .result$.subscribe((data) => {
          this.recipes = { ...data };
        });
    });
  }
}
