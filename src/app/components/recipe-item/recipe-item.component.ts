import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  @Input() recipe: any;
  user: User | null;

  constructor(private authService: AuthService) {
    this.authService.getUser().subscribe((user) => (this.user = user));
  }
}
