import { HotelesPrincipales } from './../_model/HotelesPrincipales';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Arreglo que comprueba los datos del servidor
 */
const { isArray } = Array;

/**
 * Clase que filtra las tarjetas del servicio postHotelesPrincipales.
 * 
 * @class FiltroHotelesPipe
 * @module Pipe
 */
@Pipe({
  name: 'filtroHoteles'
})
export class FiltroHotelesPipe implements PipeTransform {

  /**
   * Método que verifica si el servicio almacena información.
   * 
   * @param hoteles recibe un objeto de la clase que mapea.
   * @param find recibe la busqueda.
   * @returns la busqueda realizada.
   */
  transform(hoteles: HotelesPrincipales[], find: string): HotelesPrincipales[] {
    if(!hoteles) return [];
    if(!find) return hoteles;
    return search( hoteles, find);
   }

}

/**
 * Método que retorna las tarjetas filtradas del servicio postHotelesPrincipales .
 * 
 * @param entries recibe el arreglo de datos del servicio.
 * @param search recibe el campo de texto que se quiere filtrar.
 * @returns la tarjeta filtrada.
 */
function search(entries: any[], search: string) {


  return entries.filter(function (obj) {
    const keys: string[] = Object.keys(obj);
    return keys.some(function (key) {
      const value = obj[key];
      if (isArray(value)) {
        return value.some(v => {
          return v==search;
        });
      }
      else if (!isArray(value)) {
        return value==search;
      }
    })
  });
}
