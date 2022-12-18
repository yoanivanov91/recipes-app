import { inject, Injectable } from '@angular/core';
import { Location } from '@angular/common'
import { Router, NavigationEnd } from '@angular/router'
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackNavigationService {
  private history: string[] = []
  private router = inject(Router);
  private location = inject(Location);
  private ngUnsubscribe = new Subject<void>();
  
  constructor() {
    this.router.events.pipe(takeUntil(this.ngUnsubscribe)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects)
      }
    })
  }

  back(): void {
    this.history.pop()
    if (this.history.length > 0) {
      this.location.back()
    } else {
      this.router.navigateByUrl('/')
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
