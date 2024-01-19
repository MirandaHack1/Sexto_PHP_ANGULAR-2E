import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tiendas } from '../Interfaces/tiendas';

@Injectable({
  providedIn: 'root'
})
export class TiendasService {
  private urlBase: string =
  'http://localhost:/SEXTO_PHP_ANGULAR-2E/Inventario/Controllers/tiendas.Controller.php?op=';
  constructor(private clientePhp: HttpClient) {}
  todos(): Observable<Tiendas[]> {
    return this.clientePhp.get<Tiendas[]>(this.urlBase + 'todos');
  }
  insertar(tienda: Tiendas): Observable<any> {
    var prod = new FormData();
    prod.append('Nombre', tienda.Nombre);
    prod.append('Ciudad', tienda.Ciudad.toString());
    prod.append('Categoria', tienda.Categoria.toString());
   
    return this.clientePhp.post(this.urlBase + 'insertar', prod);
  }
  eliminar(id: number): Observable<any> {
    var prod = new FormData();
    prod.append('ID_tienda', id.toString());
    return this.clientePhp.post(this.urlBase + 'eliminar', prod);
  }
  uno(id: number): Observable<Tiendas> {
    var prod = new FormData();
    prod.append('ID_tienda', id.toString());
    return this.clientePhp.post<Tiendas>(this.urlBase + 'uno', prod);
  }
  actualizar(tienda: Tiendas, id: number): Observable<any> {
    var prod = new FormData();
    prod.append('ID_tienda', id.toString());
    prod.append('Nombre', tienda.Nombre);
    prod.append('Ciudad', tienda.Ciudad);
    prod.append('Categoria', tienda.Categoria);
    return this.clientePhp.post(this.urlBase + 'actualizar', prod);
  }
  
}

