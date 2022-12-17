import {
  Component,
  OnInit,
  isDevMode,
  enableProdMode,
  inject,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from './environment/environment';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private toast = inject(ToastrService);

  constructor(private authService: AuthService) {
    this.authService
      .fetchUserOnStart()
      .subscribe({ error: () => {
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
}
