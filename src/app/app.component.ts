import {
  Component,
  OnInit,
  isDevMode,
  enableProdMode,
  inject,
  OnDestroy,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { environment } from './environment/environment';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private toast = inject(ToastrService);
  private ngUnsubscribe = new Subject<void>();

  constructor(private authService: AuthService) {
    this.authService
      .fetchUserOnStart().pipe(takeUntil(this.ngUnsubscribe)).subscribe({ error: () => {
        localStorage.removeItem('token');
        this.toast.error('Session expired! Please log in again', 'Logged out');
      } 
    });
  }

  ngOnInit() {
    if (environment.production) {
      enableProdMode();
    }
    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
