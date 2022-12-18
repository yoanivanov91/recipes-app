import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { User } from 'src/app/models/user.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private recipeService = inject(RecipeService);
  private authService = inject(AuthService);
  private ngUnsubscribe = new Subject<void>();

  recipes: any;
  recentlyAddedRecipes: any;
  popularRecipes: any;
  myLikedRecipes: any;
  user: User | null;

  ngOnInit(): void {
    this.authService.getUser().pipe(takeUntil(this.ngUnsubscribe)).subscribe((user) => {
      this.user = user;
      this.recipeService
        .getRecentAndPopularAndLiked()
        .result$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
          this.recipes = { ...data };
        });
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
