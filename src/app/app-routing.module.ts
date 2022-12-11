import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'auth/login', title: "Recipes - login", component: LoginComponent },
  { path: 'auth/register', title: "Recipes - register", component: RegisterComponent },
  { path: '', title: "Recipes - all the best recipes in one place", component: HomeComponent },
  { path: 'recipes', title: "Recipes - all recipes", component: AllRecipesComponent },
  { path: 'profile', title: "Recipes - profile", component: AllRecipesComponent },
  { path: 'my-recipes', title: "Recipes - my recipes", component: AllRecipesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
