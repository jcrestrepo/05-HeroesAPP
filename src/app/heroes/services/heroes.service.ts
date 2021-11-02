import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl:string= environment.baseUrl;
  constructor(private http:HttpClient) {

   }

   getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(this.baseUrl+"/heroes")
   }
   getHeroePorId(id:string):Observable<Heroe> {
      
    return this.http.get<Heroe>(this.baseUrl+"/heroes/"+id)
  
    }

    buscarporNombre(termino:string):Observable<Heroe[]>{
      
      const params = new HttpParams()
      .set("q",termino)
      .set("_limit", 6);
      
      return this.http.get<Heroe[]>(this.baseUrl+"/heroes", {params})
    }
   
}
