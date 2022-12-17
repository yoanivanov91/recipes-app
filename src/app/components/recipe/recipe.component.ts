import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackNavigationService } from 'src/app/services/back-navigation.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  private recipeService = inject(RecipeService);
  private route = inject(ActivatedRoute);
  private navigation = inject(BackNavigationService);
  private toast = inject(ToastrService);

  dataFromServer: any;
  user: User | null;
  isIngredientsOpen: boolean = false;
  isHowToOpen: boolean = false;
  likes: number;
  alreadyLiked: boolean;

  constructor(private authService: AuthService) {
    this.authService.getUser().subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const { slug } = params;
      this.recipeService.getRecipe(slug).result$.subscribe((data) => {
        this.dataFromServer = { ...data };
        if(this.dataFromServer.isSuccess) {
          this.alreadyLiked = this.dataFromServer.data.recipe.alreadyLiked;
          this.likes = this.dataFromServer.data.recipe.likes;
        }
      });
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

  likeRecipe(recipeId: string) {
    this.recipeService.likeRecipe(recipeId).subscribe({
      next: () => {
        this.alreadyLiked = true;
        this.likes += 1;
        this.toast.success('Recipe liked', 'Success');
      },
      error: (error) => {
        this.toast.error(error.error.message, 'Error');
      }
    })
  }

  dislikeRecipe(recipeId: string) {
    this.recipeService.dislikeRecipe(recipeId).subscribe({
      next: () => {
        this.alreadyLiked = false;
        this.likes = this.likes == 0 ? 0 : this.likes - 1;
        this.toast.success('Recipe disliked', 'Success');
      },
      error: (error) => {
        this.toast.error(error.error.message, 'Error');
      }
    })
  }
}
