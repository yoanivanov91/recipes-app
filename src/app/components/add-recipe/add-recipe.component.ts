import {
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { useMutationResult } from '@ngneat/query';
import { RecipeService } from 'src/app/services/recipe.service';
import { BackNavigationService } from 'src/app/services/back-navigation.service';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnDestroy {
  private recipeService = inject(RecipeService);
  private router = inject(Router);
  private toast = inject(ToastrService);
  private fb = inject(FormBuilder);
  private navigation = inject(BackNavigationService);
  ingredients: string[] = [];
  submitted: boolean = false;
  added: boolean = false;
  addRecipeMutation = useMutationResult();
  private ngUnsubscribe = new Subject<void>();

  addRecipeForm: FormGroup = this.fb.group({
    title: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    category: ['', Validators.required],
    image: ['', Validators.compose([Validators.required, Validators.pattern('^https?://.+$')])],
    ingredient: [''],
    description: ['', Validators.required],
    time: ['', Validators.compose([Validators.required, Validators.min(1)])]
  });

  get form() {
    return this.addRecipeForm.controls;
  }

  changeCategory(e: Event) {
    this.addRecipeForm.get('category')?.setValue((e.target as HTMLInputElement).value, {
     onlySelf: true
    })
  }

  addIngredient() {
    this.added = true;
    if (this.addRecipeForm.get('ingredient')?.value == '') {
      this.addRecipeForm.get('ingredient')?.setErrors({ required: true });
      return false;
    } else {
      this.ingredients.push(this.addRecipeForm.get('ingredient')?.value);
      this.added = false;
      this.addRecipeForm.get('ingredient')?.setValue('');
      return true;
    }
  }

  removeIngredient(index: any) {
    this.ingredients.splice(index, 1);
  }

  handleImageError() {
    this.addRecipeForm.get('image')?.setErrors({ invalidURL: true });
  }

  back() {
    this.navigation.back();
  }

  onSubmit() {
    this.submitted = true;
    if (!this.addRecipeForm.valid) {
      this.toast.error('Please fill up the necessary fields', 'Error');
      return false;
    } else {
      const { ingredient, ...recipeData } = this.addRecipeForm.value;
      const recipe = {...recipeData, ingredients: this.ingredients};
      this.recipeService.addRecipe(recipe).pipe(this.addRecipeMutation.track(), takeUntil(this.ngUnsubscribe)).subscribe({
        next: (newRecipe) => {
          this.router.navigate(['/recipes']);
          this.toast.success(`Recipe added`, `Success`);
        },
        error: (error) => {
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

