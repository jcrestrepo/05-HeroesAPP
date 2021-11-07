import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {
    

    if (!heroe.id && !heroe.alt_img) {
      console.log("Ruta en pipe 1:" + heroe.id);
      return "/assets/no-image.png";
    } else if (heroe.alt_img) {
      console.log("Ruta en pipe 2:" + heroe.id);
      return heroe.alt_img;
    }
    return "/assets/heroes/" + heroe.id + ".jpg";
  }

}
