import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MantenedorComponent } from './comoponents/mantenedor/mantenedor/mantenedor.component';


const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: MantenedorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
