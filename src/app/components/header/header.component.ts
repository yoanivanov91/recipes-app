import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private router = inject(Router);
  private toast = inject(ToastrService);

  user: User | null;

  constructor(private authService: AuthService) {
    this.authService.getUser().subscribe(user => this.user = user);
  }

  logout(firstName: string | null) {
    this.authService.logout();
    this.router.navigate(['/']);
    this.toast.success(`Until next time, ${firstName}`, `Logged out`);
  }
}
