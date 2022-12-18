import { Component, inject, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  private router = inject(Router);
  private toast = inject(ToastrService);

  private ngUnsubscribe = new Subject<void>();
  user: User | null;

  constructor(private authService: AuthService) {
    this.authService.getUser().pipe(takeUntil(this.ngUnsubscribe)).subscribe(user => this.user = user);
  }

  logout(firstName: string | null) {
    this.authService.logout();
    this.router.navigate(['/']);
    this.toast.success(`Until next time, ${firstName}`, `Logged out`);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
