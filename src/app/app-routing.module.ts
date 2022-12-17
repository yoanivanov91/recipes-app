import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyRecipesComponent } from './components/my-recipes/my-recipes.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestsOnlyGuard } from './guards/guests-only.guard';

const routes: Routes = [
  { path: '', title: "Recipes - All the best recipes in one place", component: HomeComponent },
  { path: 'recipes', title: "Recipes - All recipes", component: AllRecipesComponent },
  { path: 'recipes/details/:slug', title: "Recipes - Details", component: RecipeComponent },
  { path: 'recipes/add', canActivate: [AuthGuard], title: "Recipes - Add a new recipe", component: AddRecipeComponent },
  { path: 'recipes/edit/:slug', canActivate: [AuthGuard], title: "Recipes - Edit", component: EditRecipeComponent },
  { path: 'profile', canActivate: [AuthGuard], title: "Recipes - My profile", component: ProfileComponent },
  { path: 'my-recipes', canActivate: [AuthGuard], title: "Recipes - My recipes", component: MyRecipesComponent },
  { path: 'auth/login', canActivate: [GuestsOnlyGuard], title: "Recipes - Login", component: LoginComponent },
  { path: 'auth/register', canActivate: [GuestsOnlyGuard], title: "Recipes - Register", component: RegisterComponent },
  { path: '**', pathMatch: "full", title: "Recipes - Page not found", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
