import { HotelesPrincipales } from './../_model/HotelesPrincipales';
import { Pipe, PipeTransform } from '@angular/core';
const { isArray } = Array;


@Pipe({
  name: 'filtroHoteles'
})
export class FiltroHotelesPipe implements PipeTransform {

  transform(hoteles: HotelesPrincipales[], find: string): HotelesPrincipales[] {
    if(!hoteles) return [];
    if(!find) return hoteles;
    return search( hoteles, find);
   }

}

function search(entries: any[], search: string) {


  return entries.filter(function (obj) {
    const keys: string[] = Object.keys(obj);
    return keys.some(function (key) {
      const value = obj[key];
      if (isArray(value)) {
        return value.some(v => {
          return (v==search);
        });
      }
      else if (!isArray(value)) {
        return (value==search);
      }
    })
  });
}
