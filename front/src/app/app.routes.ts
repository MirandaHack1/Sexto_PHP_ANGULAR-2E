import { Routes } from '@angular/router';
import { DashboardComponent } from './Views/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
// IMPORTANDO SOLO TIENDAS
import { TiendasComponent } from './Views/tiendas/tiendas.component';
import { NuevoTiendasComponent } from './Views/tiendas/nuevo-tiendas/nuevo-tiendas.component';

// IMPORNTANDO SOLO PRODUCTOS
import { ProductosComponent } from './Views/productos/productos.component';
// Declaración de importación correcta
import { NuevoProductosComponent } from './Views/productos/nuevo-productos/nuevo-productos.component';



export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'tiendas',
    component: TiendasComponent,
  },
  { path: 'nuevo-tiendas', 
  component: NuevoTiendasComponent,
  },
  {
    path: 'editar-tiendas/:id',
    component: NuevoTiendasComponent,
  },
  {
    path: 'productos',
    component: ProductosComponent,
  },
  { path: 'nuevo-productos', 
  component: NuevoProductosComponent,
  },
  {
    path: 'editar-productos/:id',
    component: NuevoProductosComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponentComponent },
];
