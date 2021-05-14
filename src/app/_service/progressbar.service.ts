import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressbarService {
  
  public barraProgreso = new Subject<string>();

  constructor() { }

  public delay() {
    return new Promise(resolve => setTimeout(resolve, 1000));
}
}
