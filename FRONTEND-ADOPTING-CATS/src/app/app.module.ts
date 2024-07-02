import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatsComponent } from './cats/cats.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { EditCatComponent } from './edit-cat/edit-cat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CatDetailsComponent } from './catdetails/catdetails.component';
import { CatService } from './services/cat.service';
import { BaseURL } from './shared/baseurl';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CatsComponent,
    HomeComponent,
    SigninComponent,
    NotFoundComponent,
    CatDetailsComponent,
    EditCatComponent,
    SignupComponent,
    AdminComponent
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CatService,
    {
      provide:'BaseURL' ,useValue:BaseURL
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
