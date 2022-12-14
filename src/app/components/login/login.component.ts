import {
  Component,
  OnInit,
  inject,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastrService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  submitted: boolean = false;
  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required]
  });
  returnUrl: string | null;
  private ngUnsubscribe = new Subject<void>();

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      this.toast.error('Please fill up the necessary fields', 'Error');
      return false;
    } else {
      this.authService.login(this.form.email.value, this.form.password.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
        next: (user) => {
          this.returnUrl ? this.router.navigate([this.returnUrl]) : this.router.navigate(['/']);
          this.toast.success(`Welcome, ${user?.firstName}`, `Logged in`);
        },
        error: (error) => { 
          this.form.password.setValue('');
          this.toast.error(error.error.message, 'Error');
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
