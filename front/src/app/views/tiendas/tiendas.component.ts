import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Tiendas } from '../../Interfaces/tiendas';
import { TiendasService } from '../../Services/tiendas.service';
@Component({
  selector: 'app-tiendas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tiendas.component.html',
  styleUrl: './tiendas.component.css'
})
export class TiendasComponent {
  title = 'tiendas';
  tiendas: Tiendas[];

  constructor(private TiendasService: TiendasService) {}

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.TiendasService.todos().subscribe((listatiendas) => {
      this.tiendas = listatiendas;
      console.log(listatiendas);
    });
  }
  alerta() {
    Swal.fire('tiendas', 'Mensaje en tiendas', 'success');
  }

  eliminar(ID_tienda : number) {
    Swal.fire({
      title: 'tiendas',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.TiendasService.eliminar(ID_tienda ).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'tiendas',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
      } else {
        Swal.fire({
          title: 'tiendas',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }

}
