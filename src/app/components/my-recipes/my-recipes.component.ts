import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { useMutationResult } from '@ngneat/query';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css'],
})
export class MyRecipesComponent implements OnInit, OnDestroy {
  private recipeService = inject(RecipeService);
  private router = inject(Router);
  private toast = inject(ToastrService);
  private authService = inject(AuthService);
  private ngUnsubscribe = new Subject<void>();
  dataFromServer: any;
  showRecipesSubject = new BehaviorSubject<Recipe[]>([]);
  showRecipes$ = this.showRecipesSubject.asObservable();
  addedRecipes: Recipe[];
  likedRecipes: Recipe[];
  recipes: Recipe[];
  show: string = 'added';
  query: string = '';
  deleteRecipeMutation = useMutationResult();
  user: User | null;
  toBeDeleted: any = {_id: '', title: ''};

  ngOnInit(): void {
    this.recipeService.getMyRecipes().result$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((recipeData) => {
      this.dataFromServer = { ...recipeData };
      if(this.dataFromServer.isSuccess) {
        this.authService.getUser().pipe(takeUntil(this.ngUnsubscribe)).subscribe((user) => (this.user = user));
        this.addedRecipes = this.dataFromServer.data.mine;
        this.likedRecipes = this.dataFromServer.data.liked;
        this.showRecipesSubject.next(this.addedRecipes);
      }
    });
    this.showRecipes$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  handleChange(event: Event) {
    this.showRecipes((event.target as HTMLInputElement).value);
  }

  showRecipes(filter: string) {
    if (filter === 'liked') {
      this.show = 'liked';
      this.showRecipesSubject.next(this.likedRecipes);
    }
    else {
      this.show = 'added';
      this.showRecipesSubject.next(this.addedRecipes);
    }
  }

  deleteRecipe(recipeId: string) {
    this.recipeService.deleteRecipe(recipeId).pipe(this.deleteRecipeMutation.track(), takeUntil(this.ngUnsubscribe)).subscribe({
      next: (deletedRecipe) => {
        this.router.navigate(['/my-recipes']);
        this.toast.success(`Recipe deleted`, `Success`);
      },
      error: (error) => {
        console.log(error);
        this.toast.error(error.message, 'Error');
      }
    }); 
  }

  selectForDelete(recipe: Recipe) {
    this.toBeDeleted = {...recipe};
  }

  getShownRecipes() {
    return this.showRecipesSubject.getValue();
  }

  search() {
    if(this.query.length < 3) {
      this.showRecipes(this.show);
      return;
    }
    let result = this.getShownRecipes().filter((recipe: Recipe) => recipe.title.toLocaleLowerCase().includes(this.query.toLocaleLowerCase()) || recipe.category.toLocaleLowerCase().includes(this.query.toLocaleLowerCase()));
    this.showRecipesSubject.next(result);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
