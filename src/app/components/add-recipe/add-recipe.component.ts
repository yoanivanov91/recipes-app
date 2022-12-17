import {
  Component,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { CustomValidators } from 'src/app/helpers/custom-validators';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastrService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  submitted: boolean = false;
  addRecipeForm: FormGroup = this.fb.group({
    title: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    category: ['', Validators.required],
    imageValidation: this.fb.group(
      {
        image: ['', Validators.required]
      },
      {
        validator: CustomValidators.isValidURL,
      }
    ),
    ingredients: [[], Validators.required],
    description: ['', Validators.required],
    time: ['', Validators.required]
  });

  get form() {
    return this.addRecipeForm.controls;
  }

  changeCategory(e: Event) {
    this.addRecipeForm.get('category')?.setValue((e.target as HTMLInputElement).value, {
     onlySelf: true
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.addRecipeForm.valid) {
      this.toast.error('Please fill up the necessary fields', 'Error');
      return false;
    } else {
      console.log(this.addRecipeForm.value);
      // const { passwordValidation, ...userData } = this.registerForm.value;
      // const user = {...userData, password: passwordValidation.password};
      // this.authService.register(user).subscribe({
      //   next: (user) => {
      //     this.returnUrl ? this.router.navigate([this.returnUrl]) : this.router.navigate(['/']);
      //     this.toast.success(`Welcome, ${user?.firstName}`, `Account created`);
      //   },
      //   error: (error) => { 
      //     this.form.passwordValidation.get('password')?.setValue('');
      //     this.form.passwordValidation.get('confirmPassword')?.setValue('');
      //     this.toast.error(error.error.message, 'Error');
      //   }
      // });
      return true;
    }
  }
}

