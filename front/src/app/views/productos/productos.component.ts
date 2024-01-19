import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Productos} from '../../Interfaces/productos';
import { ProductosService } from '../../Services/productos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  title = 'Productos';
  productos: Productos[];

  constructor(private productosServicio: ProductosService) {}

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.productosServicio.todos().subscribe((listaproductos) => {
      this.productos = listaproductos;
      console.log(listaproductos);
    });
  }
  alerta() {
    Swal.fire('Producto', 'Mensaje en Venta', 'success');
  }

  eliminar(ID_producto: number) {
    Swal.fire({
      title: 'Venta',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productosServicio.eliminar(ID_producto).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'Venta',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
      } else {
        Swal.fire({
          title: 'Venta',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
