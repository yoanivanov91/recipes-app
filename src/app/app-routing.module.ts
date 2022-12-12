import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyRecipesComponent } from './components/my-recipes/my-recipes.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', title: "Recipes - all the best recipes in one place", component: HomeComponent },
  { path: 'recipes', title: "Recipes - all recipes", component: AllRecipesComponent },
  { path: 'profile', title: "Recipes - profile", component: ProfileComponent },
  { path: 'my-recipes', title: "Recipes - my recipes", component: MyRecipesComponent },
  { path: 'recipes/add', title: "Recipes - add new recipe", component: AddRecipeComponent },
  { path: 'auth/login', title: "Recipes - login", component: LoginComponent },
  { path: 'auth/register', title: "Recipes - register", component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
