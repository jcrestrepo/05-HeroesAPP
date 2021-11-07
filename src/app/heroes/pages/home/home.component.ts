import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [ `
    .container{
      margin:10px;
    }
  `
  ]
})
export class HomeComponent implements OnInit {

  
  public get auth():Auth {
    return this.authService.auth;
  }
  
  constructor(private router:Router,
              private authService:AuthService) { }

  ngOnInit(): void {
    
  }

  logOut(){

    //TODO lLAMAR Backend
    //Un usuario

    this.router.navigate(['./auth']);
  }

}
