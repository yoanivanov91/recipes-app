import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecipeService } from 'src/app/services/recipe.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { useMutationResult } from '@ngneat/query';
import { Recipe } from 'src/app/models/recipe.model';
import { BackNavigationService } from 'src/app/services/back-navigation.service';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit, OnDestroy {
  private recipeService = inject(RecipeService);
  private router = inject(Router);
  private toast = inject(ToastrService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private navigation = inject(BackNavigationService);
  private authService = inject(AuthService);

  slug: string | null;
  dataFromServer: any;
  recipe: Recipe;
  editRecipeForm: FormGroup;
  ingredients: string[] = [];
  submitted: boolean = false;
  added: boolean = false;
  editRecipeMutation = useMutationResult();
  private ngUnsubscribe = new Subject<void>();


  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    if(this.slug) {
      this.recipeService.getRecipe(this.slug)?.result$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
        this.dataFromServer = { ...data };
        if(this.dataFromServer.isSuccess) {
          if(this.authService.getUserAsValue()?._id != this.dataFromServer.data.recipe.owner._id) {
            this.router.navigate(['/']);
            this.toast.error('Access denied', 'Error');
          } else {
            this.recipe = {...this.dataFromServer.data.recipe};
            this.createForm();
          }
        }
      });
    }
    else {
      this.dataFromServer.isError = true;
    }
  }

  createForm() {
    this.editRecipeForm = this.fb.group({
      title: [this.recipe.title, Validators.compose([Validators.required, Validators.minLength(4)])],
      category: [this.recipe.category, Validators.required],
      image: [this.recipe.image, Validators.compose([Validators.required, Validators.pattern('^https?://.+$')])],
      ingredient: [''],
      description: [this.recipe.description, Validators.required],
      time: [this.recipe.time, Validators.compose([Validators.required, Validators.min(1)])]
    });
    this.ingredients = [...this.recipe.ingredients];
  }

  get form() {
    return this.editRecipeForm.controls;
  }

  changeCategory(e: Event) {
    this.editRecipeForm.get('category')?.setValue((e.target as HTMLInputElement).value, {
     onlySelf: true
    })
  }

  addIngredient() {
    this.added = true;
    if (this.editRecipeForm.get('ingredient')?.value == '') {
      this.editRecipeForm.get('ingredient')?.setErrors({ required: true });
      return false;
    } else {
      this.ingredients.push(this.editRecipeForm.get('ingredient')?.value);
      this.added = false;
      this.editRecipeForm.get('ingredient')?.setValue('');
      return true;
    }
  }

  removeIngredient(index: any) {
    this.ingredients.splice(index, 1);
  }

  handleImageError() {
    this.editRecipeForm.get('image')?.setErrors({ invalidURL: true });
  }

  back() {
    this.navigation.back();
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editRecipeForm.valid) {
      this.toast.error('Please fill up the necessary fields', 'Error');
      return false;
    } else {
      const { ingredient, ...recipeData } = this.editRecipeForm.value;
      const recipe = {...recipeData, ingredients: this.ingredients};
      this.recipeService.editRecipe(this.dataFromServer.data.recipe._id, recipe).pipe(this.editRecipeMutation.track()).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
        next: (updatedRecipe) => {
          this.router.navigate([`/recipes/details/${this.recipe.slug}`]);
          this.toast.success(`Recipe updated`, `Success`);
        },
        error: (error) => {
          console.log(error);
          this.toast.error(error.message, 'Error');
        }
      });
      return true;
    }
  }
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
