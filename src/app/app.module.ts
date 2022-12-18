import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { provideQueryClientOptions } from '@ngneat/query';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { MyRecipesComponent } from './components/my-recipes/my-recipes.component';
import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { RecipeItemComponent } from './components/recipe-item/recipe-item.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    ProfileComponent,
    RecipeComponent,
    MyRecipesComponent,
    AllRecipesComponent,
    RegisterComponent,
    FooterComponent,
    AddRecipeComponent,
    NotFoundComponent,
    EditRecipeComponent,
    RecipeItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    // FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(({
      closeButton: true,
      progressBar: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-left',
    }))
  ],
  providers: [
    provideQueryClientOptions({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000,
          refetchOnWindowFocus: false
        },
      },
    }),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
