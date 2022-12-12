import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('registerForm') registerForm: ElementRef<HTMLFormElement>;
  email: String = '';
  password: String = '';
  rePassword: String = '';
  firstName: String = '';
  lastName: String = '';

  constructor(
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

  register() {
    if (!this.registerForm.nativeElement.checkValidity()) {
      this.renderer.addClass(this.registerForm.nativeElement, 'was-validated');
      return;
    }
    if(this.password !== this.rePassword) {
      this.toast.error('Passwords don\'t match', "Error");
      return;
    }
    this.authService.login(this.email, this.password).subscribe(() => {
      console.log('User is logged in');
      this.router.navigateByUrl('/');
    });
  }
}
