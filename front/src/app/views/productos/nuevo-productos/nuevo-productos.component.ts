import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { RouterLink,Router,ActivatedRoute } from '@angular/router';

import { ProductosService } from '../../../Services/productos.service';
import Swal from 'sweetalert2';

import { Tiendas } from '../../../Interfaces/tiendas';

import { TiendasService } from '../../../Services/tiendas.service';

@Component({
  selector: 'app-nuevo-productos',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './nuevo-productos.component.html',
  styleUrl: './nuevo-productos.component.css'
})
export class NuevoProductosComponent {
  title = 'Nuevo Porducto';
  id!:number;
  ListaTienda:Tiendas[];
  producto: FormGroup = new FormGroup({

    ID_tienda: new FormControl('', Validators.required),
    Nombre_producto: new FormControl('', Validators.required),
    Precio: new FormControl('', Validators.required),
    Stock: new FormControl('', Validators.required),
  });
 constructor(private productoServicio:ProductosService, private rutas:Router,private parametros:ActivatedRoute,  private TiendasService:TiendasService){}
 async ngOnInit(){
    this.id = this.parametros.snapshot.params['id'];
   await this.CargaTienda();
    console.log(this.id);
    if(this.id==0 || this.id==undefined){
      this.title = 'Nueva Producto';
    } else{
      this.title = 'Actualizar Producto';
      this.productoServicio.uno(this.id).subscribe((res)=>{
        console.log(res);
        this.producto.patchValue({
          ID_tienda: res.ID_tienda,
          Nombre_producto: res.Nombre_producto,
          Precio: res.Precio,
          Stock: res.Stock,
        
        });
      
      });
    }
  }
  get f(){
    return this.producto.controls;
  }
  CargaTienda(){
    this.TiendasService.todos().subscribe((res)=>{
      this.ListaTienda=res;
    });
  }

  grabar() {
    Swal.fire({
      title: 'Venta',
      text: 'Esta seguro que desea guardar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id == 0 || this.id == undefined) {
          this.productoServicio
            .insertar(this.producto.value, )
            .subscribe((res) => {
              Swal.fire({
                title: 'Venta',
                text: 'Se insertó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/productos']);
              this.id = 0;
            });
        } else {
          this.productoServicio
            .actualizar(this.producto.value,this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'Venta',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/productos']);
              this.id = 0;
            });
        }
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
