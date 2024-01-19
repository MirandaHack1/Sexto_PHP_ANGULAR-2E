import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productos } from '../Interfaces/productos';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private urlBase: string =
  'http://localhost:/SEXTO_PHP_ANGULAR-2E/Inventario/Controllers/productos.Controller.php?op=';
  constructor(private cliente: HttpClient) {}

  todos(): Observable<Productos[]> {
    return this.cliente.get<Productos[]>(this.urlBase + 'todos');
  }
  uno(id: number): Observable<Productos> {
    var producto = new FormData();
    producto.append('ID_producto', id.toString());
    return this.cliente.post<Productos>(this.urlBase + 'uno', producto);
  }
  insertar(productos: Productos): Observable<any> {
    var producto = new FormData();
    producto.append('ID_tienda', productos.ID_tienda.toString());
    producto.append('Nombre_producto',productos.Nombre_producto);
    producto.append('Precio',productos.Precio.toString());
    producto.append('Stock',productos.Stock.toString());

    console.log(producto);
    return this.cliente.post(this.urlBase + 'insertar', producto);
  }
  actualizar(productos: Productos, id:number): Observable<any> {
    var producto = new FormData();
    producto.append('ID_producto', id.toString());
    producto.append('ID_tienda', productos.ID_tienda.toString());
    producto.append('Nombre_producto',productos.Nombre_producto);
    producto.append('Precio',productos.Precio.toString());
    producto.append('Stock',productos.Stock.toString());
    return this.cliente.post(this.urlBase + 'actualizar', producto);
  }
  eliminar(id: number): Observable<any> {
    var producto = new FormData();
    producto.append('ID_producto', id.toString());
    return this.cliente.post(this.urlBase + 'eliminar', producto);
  }
}
