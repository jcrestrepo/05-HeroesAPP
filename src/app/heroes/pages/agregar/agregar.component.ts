import { Component, OnInit, Pipe } from '@angular/core';
import { Publisher, Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width: 100%;
      border-radius: 5px;
    }

  `
  ]
})
export class AgregarComponent implements OnInit {

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''


  }
  publisher = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]
  constructor(private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(
          switchMap(({ id }) => this.heroesService.getHeroePorId(id))
        )
        .subscribe(heroe => this.heroe = heroe)
    }

  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      this.heroesService.actualizarrHeroe(this.heroe)
        .subscribe(hero => console.log(hero));
      this._snackBar.open('Heroe Actualizado', 'Cerrar', {
        duration: 2500
      });
    } else {
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe(heroe => this.router.navigate(['/heroes/editar/', heroe.id]));
      let snackBarRef = this._snackBar.open('Heroe Guardado', 'Cerrar', {
        duration: 2500
      });

    }
  }
  eliminar() {

    const resultadoDialog = this.dialog.open(ConfirmarComponent, {
      data: this.heroe
    });

    resultadoDialog.afterClosed().subscribe(
      (result) => {

        if (result) {
          this.heroesService.eliminarrHeroe(this.heroe).
            subscribe(resp => this.router.navigate(['/heroes/listado/']));
        }
      }

    )



  }
}
