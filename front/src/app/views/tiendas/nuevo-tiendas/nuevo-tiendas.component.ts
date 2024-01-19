import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TiendasService } from '../../../Services/tiendas.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-tiendas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './nuevo-tiendas.component.html',
  styleUrl: './nuevo-tiendas.component.css'
})
export class NuevoTiendasComponent {
  title = '';
  id!: number;

  tiendas: FormGroup = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Ciudad: new FormControl('', Validators.required),
    Categoria: new FormControl('', Validators.required), 
  
  });
  constructor(
    private tiendasServicio: TiendasService,
    private rutas: Router,
    private parametros: ActivatedRoute
  ) {}
  ngOnInit() {
    this.id = this.parametros.snapshot.params['id'];
    console.log(this.id);
    if (this.id == 0 || this.id == undefined) {
      this.title = 'Nuevo tiendas';
    } else {
      this.title = 'Actualizar tiendas';
      this.tiendasServicio.uno(this.id).subscribe((res) => {
        console.log(res);
        this.tiendas.patchValue({
          Nombre: res.Nombre,
          Ciudad: res.Ciudad,
          Categoria: res.Categoria,
 

        });
      });
    }
  }
  get f() {
    return this.tiendas.controls;
  }

  grabar() {
    Swal.fire({
      title: 'tiendass',
      text: 'Esta seguro que desea guardar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id == 0 || this.id == undefined) {
          this.tiendasServicio
            .insertar(this.tiendas.value, )
            .subscribe((res) => {
              Swal.fire({
                title: 'tiendass',
                text: 'Se insertó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/tiendas']);
              this.id = 0;
            });
        } else {
          this.tiendasServicio
            .actualizar(this.tiendas.value, this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'tiendass',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/tiendas']);
              this.id = 0;
            });
        }
      } else {
        Swal.fire({
          title: 'tiendass',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
