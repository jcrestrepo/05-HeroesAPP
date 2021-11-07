import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Auth } from '../interfaces/auth.interfaces';
import { map, tap } from 'rxjs/operators';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string= environment.baseUrl;
  private _auth:Auth | undefined;
  
  constructor(private http:HttpClient) { 
  }

  verificarAutenticacion():Observable<boolean>{
     if(!localStorage.getItem("token")){
        return of(false);
     }
     return this.http.get<Auth>(this.baseUrl + "/usuarios/1").
      pipe(
        map(resp=>{
          console.log("map:" +resp);
          if(resp){
            this._auth=resp;
            return true;
          }else{
            return false;
          }
        }
           

        )
      )
     return of(true);

  }
  public get auth():Auth  {
    return { ...this._auth!};
  }
  
  login(){
    return this.http.get<Auth>(this.baseUrl + "/usuarios/1").
      pipe(
        tap(resp => this._auth=resp),
        tap(resp => localStorage.setItem("token",resp.id))
      );

  }
}
