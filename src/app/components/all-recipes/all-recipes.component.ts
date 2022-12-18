import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css']
})
export class AllRecipesComponent implements OnInit, OnDestroy {
  private recipeService = inject(RecipeService);
  private route = inject(ActivatedRoute);
  
  private ngUnsubscribe = new Subject<void>();
  dataFromServer: any;
  showRecipesSubject = new BehaviorSubject<any>([]);
  showRecipes$ = this.showRecipesSubject.asObservable();
  allRecipes: Recipe[];
  show: String = 'recent';
  
  ngOnInit(): void {
    this.recipeService.getAllRecipes().result$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((recipeData) => {
      this.dataFromServer = { ...recipeData };
      this.showRecipesSubject.next(this.dataFromServer.data);
    });
    this.showRecipes$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(recipes => this.allRecipes = recipes);
  }
    
  showRecipes(filter: string) {
    if (filter === 'popular') {
      this.show = 'popular';
      this.showRecipesSubject.next([...this.dataFromServer.data].sort((a: Recipe, b: Recipe) => Number(b.likes) - Number(a.likes)))
    }
    else {
      this.show = 'recent';
      this.showRecipesSubject.next(this.dataFromServer.data);
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
