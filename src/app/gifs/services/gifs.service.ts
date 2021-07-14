import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '9iS0EtELkAXSVPmleoiPwrvgOO1oRU8y';
  private _historial: string[] = [];

  //TODO: Cambiar any por su tipo
  public resultados: any[] = [];

  get historial() {

    return [...this._historial];
  }

  constructor(private http: HttpClient) { }

  buscarGifs(query: string = '') {

    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=9iS0EtELkAXSVPmleoiPwrvgOO1oRU8y&q=${ query }&limit=10`)
      .subscribe((res: any) => {
        console.log(res.data);
        this.resultados = res.data;
      });
  }

}
