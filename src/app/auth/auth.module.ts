import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule
  ]
})
export class AuthModule { }
