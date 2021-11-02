import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado!:Heroe;

  constructor(private heroesServices:HeroesService) { }

  ngOnInit(): void {
  }
  buscando(){
    this.heroes=[];
    this.heroesServices.buscarporNombre(this.termino)
    .subscribe( hero => this.heroes=hero);
  }
  opcionSeleccionada(event:MatAutocompleteSelectedEvent){
    
    const heroe:Heroe =event.option.value;
    this.termino=heroe.superhero;
    this.heroesServices.getHeroePorId(heroe.id!)
    .subscribe(heroea =>this.heroeSeleccionado=heroea);
  }

}
