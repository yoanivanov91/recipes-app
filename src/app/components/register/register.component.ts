import {
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { CustomValidators } from 'src/app/helpers/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastrService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  submitted: boolean = false;
  registerForm: FormGroup = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    passwordValidation: this.fb.group(
      {
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: CustomValidators.matchPassword,
      }
    ),
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  });
  returnUrl: string | null;

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  get form() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.registerForm.valid) {
      this.toast.error('Please fill up the necessary fields', 'Error');
      return false;
    } else {
      const { passwordValidation, ...userData } = this.registerForm.value;
      const user = {...userData, password: passwordValidation.password};
      this.authService.register(user).subscribe({
        next: (user) => {
          this.returnUrl ? this.router.navigate([this.returnUrl]) : this.router.navigate(['/']);
          this.toast.success(`Welcome, ${user?.firstName}`, `Account created`);
        },
        error: (error) => { 
          this.form.passwordValidation.get('password')?.setValue('');
          this.form.passwordValidation.get('confirmPassword')?.setValue('');
          this.toast.error(error.error.message, 'Error');
        }
      });
      return true;
    }
  }
}
