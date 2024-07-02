import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './signup/signup.component';
import { CatsComponent } from './cats/cats.component';
import { EditCatComponent } from './edit-cat/edit-cat.component';
import { CatDetailsComponent } from './catdetails/catdetails.component';
import { authGuard } from './guards/auth-guards.guard';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {path:'',canActivate:[authGuard],data: {roles: ['ROLE_ADMIN','ROLE_USER']}, component:HomeComponent},  
  //{path:'about',canActivate:[authGuard],component:AboutComponent},
  {path:'about',canActivate: [authGuard],data: {roles: ['ROLE_ADMIN','ROLE_USER']},component:AboutComponent},
  //{path:'cats',canActivate:[authGuard], component:CatsComponent},
  {path:'cats',canActivate:[authGuard], data: {roles: ['ROLE_ADMIN','ROLE_USER']}, component:CatsComponent},
  {path:'cats/edit/:id', canActivate:[authGuard], data: {roles: ['ROLE_ADMIN']},component:EditCatComponent },
  {path:'cats/:id',canActivate:[authGuard],data: {roles: ['ROLE_ADMIN','ROLE_USER']}, component: CatDetailsComponent},
  {path:'admin', canActivate:[authGuard], data: {roles: ['ROLE_ADMIN']},component:AdminComponent},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:"**",component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }