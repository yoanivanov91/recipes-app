import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackNavigationService } from 'src/app/services/back-navigation.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { QueryClientService, useMutationResult } from '@ngneat/query';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit, OnDestroy {
  private recipeService = inject(RecipeService);
  private route = inject(ActivatedRoute);
  private navigation = inject(BackNavigationService);
  private toast = inject(ToastrService);
  private router = inject(Router);
  private queryClient = inject(QueryClientService);

  slug: string | null;
  dataFromServer: any;
  user: User | null;
  isIngredientsOpen: boolean = false;
  isHowToOpen: boolean = false;
  likes: number;
  alreadyLiked: boolean;
  deleteRecipeMutation = useMutationResult();
  private ngUnsubscribe = new Subject<void>();
  likeMutation = useMutationResult();
  dislikeMutation = useMutationResult();

  constructor(private authService: AuthService) {
    this.authService.getUser().pipe(takeUntil(this.ngUnsubscribe)).subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    if(this.slug) {
      this.recipeService.getRecipe(this.slug)?.result$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
        this.dataFromServer = { ...data };
        if(this.dataFromServer.isSuccess) {
          this.alreadyLiked = this.dataFromServer.data.recipe.alreadyLiked;
          this.likes = this.dataFromServer.data.recipe.likes;
        }
      });
    }
    else {
      this.dataFromServer.isError = true;
    }
    // this.route.params.subscribe((params) => {
    //   const { slug } = params;
    //   this.recipeService.getRecipe(slug).result$.subscribe((data) => {
    //     this.dataFromServer = { ...data };
    //     if(this.dataFromServer.isSuccess) {
    //       this.alreadyLiked = this.dataFromServer.data.recipe.alreadyLiked;
    //       this.likes = this.dataFromServer.data.recipe.likes;
    //     }
    //   });
    // });
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

  likeRecipe(recipeId: string) {
    this.recipeService.likeRecipe(recipeId).pipe(this.likeMutation.track(), takeUntil(this.ngUnsubscribe)).subscribe({
      next: (newLike) => {
        // this.router.navigate(['/recipes']);
        this.toast.success(`Recipe liked`, `Success`);
      },
      error: (error) => {
        this.toast.error(error.message, 'Error');
      }
    });
    // this.recipeService.likeRecipe(recipeId).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
    //   next: () => {
    //     // this.alreadyLiked = true;
    //     // this.likes += 1;
    //     // this.queryClient.invalidateQueries(['allRecipes', this.slug]);
    //     this.toast.success('Recipe liked', 'Success');
    //   },
    //   error: (error) => {
    //     this.toast.error(error.error.message, 'Error');
    //   }
    // })
  }

  dislikeRecipe(recipeId: string) {
    this.recipeService.dislikeRecipe(recipeId).pipe(this.dislikeMutation.track(), takeUntil(this.ngUnsubscribe)).subscribe({
      next: (newLike) => {
        // this.router.navigate(['/recipes']);
        this.toast.success(`Recipe disliked`, `Success`);
      },
      error: (error) => {
        this.toast.error(error.message, 'Error');
      }
    });
    // this.recipeService.dislikeRecipe(recipeId).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
    //   next: () => {
    //     // this.alreadyLiked = false;
    //     // this.likes = this.likes == 0 ? 0 : this.likes - 1;
    //     // this.queryClient.invalidateQueries(['allRecipes', this.slug]);
    //     this.toast.success('Recipe disliked', 'Success');
    //   },
    //   error: (error) => {
    //     this.toast.error(error.error.message, 'Error');
    //   }
    // })
  }

  deleteRecipe(recipeId: string) {
    this.recipeService.deleteRecipe(recipeId).pipe(this.deleteRecipeMutation.track(), takeUntil(this.ngUnsubscribe)).subscribe({
      next: (deletedRecipe) => {
        this.router.navigate(['/recipes']);
        this.toast.success(`Recipe deleted`, `Success`);
      },
      error: (error) => {
        console.log(error);
        this.toast.error(error.message, 'Error');
      }
    }); 
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
