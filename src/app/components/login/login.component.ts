import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: ElementRef<HTMLFormElement>;
  email: String = '';
  password: String = '';

  constructor(
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    if (!this.loginForm.nativeElement.checkValidity()) {
      this.renderer.addClass(this.loginForm.nativeElement, 'was-validated');
      return;
    }
    this.authService.login(this.email, this.password).subscribe(() => {
      console.log('User is logged in');
      this.router.navigateByUrl('/');
    });
    // this.renderer.setStyle(this.loginForm.nativeElement, 'background', '#d515a0');
  }
}
